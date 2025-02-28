# AiTone - AI-Powered Music Code Editor

AiTone is a web application that allows users to write and execute music code in the browser using Tone.js, with the ability to modify the code using natural language requests processed by AI.

## Features

- **Monaco Editor** for writing JavaScript-based music code with syntax highlighting
- **Tone.js Integration** for music synthesis and playback in the browser
- **AI-Powered Modifications** using OpenAI's API to transform your music based on natural language requests
- **Example Suggestions** to help you get started with common modifications

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/aitone.git
   cd aitone
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your environment variables:
   - Create a `.env` file in the root directory
   - Add your OpenAI API key:
     ```
     OPENAI_API_KEY=your_api_key_here
     MODEL=gpt-4o-mini
     ```

4. Scrape Tone.js documentation (optional but recommended):
   ```
   npm run scrape
   ```

5. Start the server:
   ```
   npm start
   ```

6. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## How to Use

1. **Write Music Code**: Use the Monaco editor to write JavaScript code using Tone.js.
2. **Run Your Code**: Click the "Run" button to execute your code and hear the music.
3. **Modify with Natural Language**: Enter a description of how you want to modify the music in the input field.
4. **Apply AI Modifications**: Click "Modify" to have the AI update your code based on your request.
5. **Try Examples**: Click on any of the example suggestions to quickly try different modifications.

## Project Structure

- `index.html` - The main web interface
- `server.js` - Express server for handling API requests
- `utils/scraper.js` - Utility for scraping Tone.js documentation
- `data/tone-docs.txt` - Processed Tone.js documentation for the AI system prompt

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, Monaco Editor, Tone.js
- **Backend**: Node.js, Express
- **AI**: OpenAI API (gpt-4o-mini model)
- **Documentation Scraping**: Axios, Cheerio

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Tone.js](https://tonejs.github.io/) for the amazing audio framework
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for the code editing capabilities
- [OpenAI](https://openai.com/) for the AI capabilities 