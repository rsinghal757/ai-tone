# AiTone - AI-powered Music Code Editor

AiTone is an interactive web application that allows you to create and modify music code using AI and Tone.js.

## Features

- Interactive code editor with syntax highlighting
- AI-powered code modification based on natural language requests
- Interactive piano keyboard for testing notes
- Example templates for common music patterns

## Live Demo

Visit [aitone.netlify.app](https://aitone.netlify.app) to try it out!

## Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   OPENAI_API_KEY=your_openai_api_key
   MODEL=openrouter_model_name
   ```
4. Start the development server with Netlify CLI:
   ```
   npm run dev
   ```
5. Open `http://localhost:8888` in your browser

## Deploying to Netlify

1. Fork this repository
2. Create a new site in Netlify and connect it to your forked repository
3. Add the following environment variables in the Netlify site settings:
   - `OPENAI_API_KEY`: Your Openrouter API key
   - `MODEL`: The Openrouter model to use
4. Deploy the site

### Netlify Deployment Steps

1. Sign up for a free Netlify account at [netlify.com](https://www.netlify.com/)
2. Click "Add new site" > "Import an existing project"
3. Connect to your GitHub repository
4. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `.`
5. Click "Show advanced" and add your environment variables
6. Click "Deploy site"

## How It Works

1. Enter a natural language request in the input field (e.g., "Add a drum beat")
2. Click "Modify" to send the request to the AI
3. The AI will modify the code based on your request
4. Click "Run" to play the modified music
5. Click "Stop" to stop the music

## Technologies Used

- [Tone.js](https://tonejs.github.io/) - Web Audio framework
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor
- [Netlify Functions](https://www.netlify.com/products/functions/) - Serverless backend
- [OpenAI API](https://openai.com/) - AI code generation

## Project Structure

- `index.html` - The main web interface
- `netlify/functions/` - Serverless functions for API endpoints
- `netlify.toml` - Netlify configuration

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Tone.js](https://tonejs.github.io/) for the amazing audio framework
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for the code editing capabilities
- [OpenAI](https://openai.com/) for the AI capabilities 