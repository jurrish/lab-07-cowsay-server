'use strict';

const http = require('http');
const url = require('url');
const cowsay = require('cowsay');
const queryString = require('querystring');

const parse = require('parse-body');

const PORT = process.env.PORT || 3000;

const server = module.exports = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  let query = queryString.parse(req.url.query);
  res.setHeader('Content-Type', 'text/html');

  if(req.method === 'GET') {
    console.log('get request received');

    if(req.url.pathname === '/') {
      res.statusCode === 200;
      res.write('hello world');
      res.end();
    }

    if(req.url.pathname === '/cowsay') {
      if(query.text) {
        res.write(cowsay.say({text : query.text}));
        res.end();
      }
      else {
        res.statusCode === 400;
        res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
        res.end();
      }
    }

  }

  if(req.method === 'POST') {
    console.log('post request received');

  }
});

server.listen(PORT, function() {
  console.log('server started');
});
