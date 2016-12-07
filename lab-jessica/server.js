'use strict';

const http = require('http');
const url = require('url');
const queryString = require('querystring');
const fs = require('fs');

const cowsay = require('cowsay');

const parseBody = require('./lib/parse-body.js');

const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);

  const path = req.url.pathname;

  if(req.method === 'GET') {
    const message = req.url.query.text;
    const animal = req.url.query.animal;

    if(path === '/') {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write('HELLO WORLD' + '\n');
    } else if(path === '/cowsay' && message && animal) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({f: animal, text: message}) + '\n');
    } else {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy&animal=meow'}) + '\n');
    }
  }
  if(req.method === 'POST') {
    parseBody(req, function(err) {
      if (err) return console.error(err);
      var message = req.body.text;

      if(message) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        fs.createReadStream(cowsay.say({text: message}) + '\n').pipe(res);
      } else {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}) + '\n');
      }
    });
  }
  res.end();
});

server.listen(PORT, function () {
  console.log('server running on port', PORT);
});
