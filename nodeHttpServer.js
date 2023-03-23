// Load HTTP module
const http = require('http')
const hostname = '127.0.0.1'
const port = 8000

// Create HTTP server
const server = http.createServer((req, res) => {
  // Set the response HTTP header with HTTP and Content type
  res.writeHead(200, {'Content-Type': 'text/plain'})
  // Send the response body 'Welcome the start learning node and express'
  res.end('Welcome the start learning node and express \n')
})

// Prints a log once the server starts listening
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})