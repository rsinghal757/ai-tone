const { OpenAI } = require('openai');
require('dotenv').config();

// Basic Tone.js documentation for the system prompt
const toneJsDocs = 'Tone.js is a Web Audio framework for creating interactive music in the browser. ' +
  'It provides a simple API for creating and manipulating audio in the browser, ' +
  'with support for synthesizers, effects, scheduling, and more.';

// Initialize OpenAI client
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENAI_API_KEY,
});

exports.handler = async function(event, context) {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse request body
    const requestBody = JSON.parse(event.body);
    const { code, request } = requestBody;
    
    if (!code || !request) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Code and request are required' })
      };
    }
    
    // Check if API key is available
    if (!process.env.OPENAI_API_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'OpenAI API key is not configured' })
      };
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
    
    console.log(`Using model: ${process.env.MODEL || 'openai/gpt-4o'}`);
    console.log(`Processing request: ${request.substring(0, 30)}...`);
    
    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: process.env.MODEL || 'openai/gpt-4o',
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
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ modifiedCode })
    };
  } catch (error) {
    console.error('Error modifying code:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message || 'An error occurred while modifying the code' })
    };
  }
}; 