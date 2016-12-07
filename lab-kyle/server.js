'use strict';

const http = require('http');
const url = require('url');
const cowsay = require('cowsay');
const queryString = require('querystring');

const parse = require('./lib/parse-body');

const PORT = process.env.PORT || 3000;

const server = module.exports = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  let query = queryString.parse(req.url.query);
  let animal = query.animal || 'default';
  res.setHeader('Content-Type', 'text/html');


  if(req.method === 'GET') {
    console.log('get request received');

    if(req.url.pathname === '/') {
      writeRes(200, 'hello world');
    }

    if(req.url.pathname === '/cowsay') {
      if(query.text) {
        writeRes(200, query.text, animal);
      }
      else {
        writeRes(400, 'bad request\ntry: localhost:3000/cowsay?text=howdy');
      }
    }
  }

  if(req.method === 'POST') {
    console.log('post request received');
    parse(req, res, cowsay, writeRes, function(err) {
      if (err) console.error(err);
    });

  }

  function writeRes(statusCode, text, animal) {
    res.statusCode = statusCode;
    res.write(cowsay.say({text: text, f: animal}));
    res.end();
  }
});

server.listen(PORT, function() {
  console.log('server started');
});
