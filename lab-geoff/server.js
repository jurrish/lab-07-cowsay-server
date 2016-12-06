'use strict';

let http = require('http');
let url = require('url');
let querystring = require('querystring');

let PORT = 3000;

let server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  console.log(req.url.query);
  console.log(req.url);
  res.write('hello world');
  res.end();
  return;
});

server.listen(PORT, function() {
  console.log('server running on port ' + PORT);
});

