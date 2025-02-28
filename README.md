# AiTone - AI-powered Music Code Editor

AiTone is an interactive web application that allows you to create and modify music code using AI and Tone.js.

## Features

- Interactive code editor with syntax highlighting
- AI-powered code modification based on natural language requests
- Interactive piano keyboard for testing notes
- Example templates for common music patterns

## Live Demo

Visit [ai-tone.vercel.app](https://ai-tone.vercel.app) to try it out!

## Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   OPENAI_API_KEY=your_openai_api_key
   MODEL=google/gemini-flash-1.5
   PORT=3000
   ```
4. Start the server:
   ```
   npm start
   ```
5. Open `http://localhost:3000` in your browser

## Deploying to Vercel

1. Fork this repository
2. Create a new project in Vercel and connect it to your forked repository
3. Add the following environment variables in the Vercel project settings:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `MODEL`: The model to use (e.g., `google/gemini-flash-1.5`)
4. Deploy the project

## How It Works

1. Enter a natural language request in the input field (e.g., "Add a drum beat")
2. Click "Modify" to send the request to the AI
3. The AI will modify the code based on your request
4. Click "Run" to play the modified music
5. Click "Stop" to stop the music

## Technologies Used

- [Tone.js](https://tonejs.github.io/) - Web Audio framework
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor
- [Express](https://expressjs.com/) - Web server
- [OpenAI API](https://openai.com/) - AI code generation
- [Vercel](https://vercel.com/) - Deployment platform

## Project Structure

- `index.html` - The main web interface
- `server.js` - Express server for handling API requests
- `utils/scraper.js` - Utility for scraping Tone.js documentation
- `data/tone-docs.txt` - Processed Tone.js documentation for the AI system prompt

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Tone.js](https://tonejs.github.io/) for the amazing audio framework
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for the code editing capabilities
- [OpenAI](https://openai.com/) for the AI capabilities 