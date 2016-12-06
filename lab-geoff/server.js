'use strict';

let http = require('http');
let url = require('url');

let PORT = 3000;

let server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  console.log(req.url);
  res.write('hello world');
  res.end();
  return;
});

server.listen(PORT, function() {
  console.log('server running on port ' + PORT);
});

