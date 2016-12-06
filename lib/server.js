'use strict';

const http = require('http');
const cowsay = require('cowsay');
const fs = require('fs');
const url = require('url');
const queryString = require('querystring');
// const parseBody = require('./lib/parse-body');
const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req, res){
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);
  console.log('req.url: ' + req.url);
  console.log('req.method: ' + req.method);
  console.log('req.headers', req.headers);

  // res.writeHead(200, {'Content-Type ' : 'text/plain'});
  res.write(cowsay.say({text: 'hello world'}));
  res.end();
});

server.listen(PORT, () => {
  console.log('serving port 3000');
});
