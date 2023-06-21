const http = require('http');
const fs = require('fs');
const url = require('url');
const express = require('express');
const app = express();

app.get('/home/kali/Documents/nodefiles/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  const port = 5500; // Choose a port number

app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:5500`);
});
http.createServer((req, res) => {
  const path = url.parse(req.url, true).pathname;

  if (path === '/home/kali/Documents/nodefiles/') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(404);
        res.write('Page not found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
      }
      res.end();
    });
  } else if (path === '/book-movie-tickets') {
    const query = url.parse(req.url, true).query;
    const movieName = query.movieName;
    const numOfTickets = query.numOfTickets;

    const totalPrice = calculatePrice(movieName, numOfTickets);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Thank you for booking ${numOfTickets} tickets for ${movieName}!</h1>`);
    res.write(`<p>Total price: $${totalPrice}</p>`);
    res.end();
  } else {
    res.writeHead(404);
    res.write('Page not found');
    res.end();
  }
}).listen(8080);

function calculatePrice(movieName, numOfTickets) {
  // Logic to calculate the total price for the movie tickets
}
