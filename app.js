// Simple Node.js Hello World application with name input
const readline = require('readline');
const http = require('http');
const url = require('url');

// Create readline interface for console input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to get name and display personalized greeting
function getNameAndGreet() {
  rl.question('What is your name? ', (name) => {
    const greeting = name.trim() ? `Hello, ${name.trim()}!` : 'Hello, World!';
    console.log(greeting);
    rl.close();
  });
}

// Call the greeting function
getNameAndGreet();

// Create HTTP server with name parameter support
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const name = parsedUrl.query.name;
  
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  
  if (name) {
    res.end(`Hello, ${name}!\n`);
  } else {
    res.end('Hello, World!\nTip: Try adding ?name=YourName to the URL\n');
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Try visiting: http://localhost:${PORT}/?name=YourName`);
});