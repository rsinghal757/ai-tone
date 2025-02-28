#!/bin/bash

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Try to find and kill any existing Node.js processes using port 3000
echo "Checking for existing server processes..."
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  PID=$(lsof -ti:3000)
  if [ ! -z "$PID" ]; then
    echo "Killing existing process on port 3000 (PID: $PID)..."
    kill -9 $PID
  fi
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
  # Linux
  PID=$(netstat -tulpn 2>/dev/null | grep ':3000' | awk '{print $7}' | cut -d'/' -f1)
  if [ ! -z "$PID" ]; then
    echo "Killing existing process on port 3000 (PID: $PID)..."
    kill -9 $PID
  fi
fi

# Start the server
echo "Starting AiTone server..."
npm start 