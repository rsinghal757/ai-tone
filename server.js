const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('./'));

// Add middleware to handle Vercel deployment
app.use((req, res, next) => {
  // Set CORS headers for Vercel deployment
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Add a health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', environment: process.env.VERCEL ? 'vercel' : 'development' });
});

// Initialize OpenAI client
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENAI_API_KEY,
});

// Load Tone.js documentation for the system prompt
let toneJsDocs = '';
try {
  // In Vercel environment, use a simplified approach
  if (process.env.VERCEL) {
    console.log('Running on Vercel - using simplified Tone.js documentation');
    toneJsDocs = 'Tone.js is a Web Audio framework for creating interactive music in the browser. ' +
      'It provides a simple API for creating and manipulating audio in the browser, ' +
      'with support for synthesizers, effects, scheduling, and more.';
  } else {
    const docsPath = path.join(__dirname, 'data', 'tone-docs.txt');
    if (fs.existsSync(docsPath)) {
      toneJsDocs = fs.readFileSync(docsPath, 'utf8');
      console.log('Loaded Tone.js documentation for system prompt');
    } else {
      console.warn('Tone.js documentation not found. Run "npm run scrape" to generate it.');
      toneJsDocs = 'Tone.js is a Web Audio framework for creating interactive music in the browser.';
    }
  }
} catch (error) {
  console.error('Error loading Tone.js documentation:', error);
  toneJsDocs = 'Tone.js is a Web Audio framework for creating interactive music in the browser.';
}

// API endpoint to modify music code
app.post('/api/modify', async (req, res) => {
  try {
    const { code, request } = req.body;
    
    if (!code || !request) {
      return res.status(400).json({ error: 'Code and request are required' });
    }
    
    // Check if API key is available
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ 
        error: 'OpenAI API key is not configured. Please check your .env file.' 
      });
    }
    
    // Create system prompt with Tone.js documentation
    const systemPrompt = `You are an expert in Tone.js and music programming. 
Your task is to modify the provided JavaScript code according to the user's request.
Return ONLY the modified code without any explanations or markdown formatting.

Here is documentation about Tone.js to help you:

${toneJsDocs}

Remember to follow best practices:
1. Always use await Tone.start() before playing any sounds
2. Clean up resources when they're no longer needed
3. Use Tone.Transport for precise timing when appropriate
4. Connect audio nodes to the destination or other nodes
5. Use Tone.js time notation for musical timing`;
    
    console.log(`Using model: ${process.env.MODEL || 'google/gemini-flash-1.5'}`);
    console.log(`Processing request: ${request.substring(0, 30)}...`);
    
    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: process.env.MODEL || 'google/gemini-flash-1.5',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: `Current code:\n\n${code}\n\nModification request: ${request}\n\nPlease modify the code according to this request. Return ONLY the modified code.`
        }
      ],
      temperature: 0.1
    });
    
    // Extract the modified code from the response
    const modifiedCode = response.choices[0].message.content.trim();
    
    // Return the modified code
    res.json({ modifiedCode });
  } catch (error) {
    console.error('Error modifying code:', error);
    res.status(500).json({ error: error.message || 'An error occurred while modifying the code' });
  }
});

// Function to find an available port
function startServer(port) {
  // In Vercel environment, we don't need to start a server
  if (process.env.VERCEL) {
    console.log('Running on Vercel - no need to start server');
    return;
  }
  
  const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    
    // Update the client-side SERVER_URL if port is different from default
    if (port !== 3000) {
      try {
        const indexPath = path.join(__dirname, 'index.html');
        let indexContent = fs.readFileSync(indexPath, 'utf8');
        indexContent = indexContent.replace(
          /const SERVER_URL = ['"]http:\/\/localhost:\d+['"]/,
          `const SERVER_URL = 'http://localhost:${port}'`
        );
        fs.writeFileSync(indexPath, indexContent);
        console.log(`Updated index.html to use port ${port}`);
      } catch (err) {
        console.warn(`Could not update port in index.html: ${err.message}`);
      }
    }
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
  
  return server;
}

// Start the server with port fallback
startServer(PORT);

// Export the Express app for Vercel serverless functions
module.exports = app; 