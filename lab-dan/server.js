'use strict';

const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 3000;

function start (route, handle) {
  function onRequest (request, response) {
    let pathname = url.parse(request.url).pathname;
    if (route && handle) return route(handle, pathname, request, response);
    response.writeHeader(200, {'Content-Type':'text/plain'});
    response.write('Hello, World!');
    response.end();
  }

  let server = http.createServer(onRequest);
  server.listen(PORT, function(){
    console.log('server started on port:', PORT);
  });

  return server;
}

exports.start = start;
