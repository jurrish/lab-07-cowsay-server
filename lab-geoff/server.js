'use strict';

let http = require('http');
let PORT = 3000;

let server = http.createServer(function(req, res) {
  console.log(req);
  res.write('hello world');
  res.end();
  return;
});

server.listen(PORT, function() {
  console.log('server running on port ' + PORT);
});

