'use strict';

let http = require('http');

let server = http.createServer();
let PORT = 3000;

server.listen(PORT, function() {
  console.log('server running on port ' + PORT);
});

