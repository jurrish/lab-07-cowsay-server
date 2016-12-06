'use strict';

// Assign Goblal Vars
const http = require('http');
const url = require('url');
const queryString = require('querystring');

const parseBody = require('./lib/bodyParser.js');

const cowsay = require('cowsay');  // Moooooo


const PORT = process.env.PORT || 3000;  //usr def or 3000

module.exports = exports = {};
// Create the server request
const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);

  if(req.url.pathname === '/') {
    res.writeHead(200,
      {'Content-Type': 'text/plain'});
    res.write('Hello World');
    res.end();
  }
});