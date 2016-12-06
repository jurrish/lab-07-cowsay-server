'use strict';

const http = require('http');

const requestParser = require('./lib/requestparser');
const cowsayresponse = require('./lib/cowsayresponse');

const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req, res) {
  requestParser.parseUrlData(req);

  if (req.url.pathname === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write('hello world');
    res.end();
  } else if (req.url.pathname === '/cowsay') {
    if (req.method === 'GET') {

    } else if (req.method === 'POST') {
      requestParser.parseBody(req);

    } else {
      console.log('Incoming unused method: ' + req.method);
      res.statusCode = 501;
      res.setHeader('Content-Type', 'text/plain');
      res.write('No endpoint set up for ' + req.method);
      res.end();
    }
  }
});

server.listen(PORT);
