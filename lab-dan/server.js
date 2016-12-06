'use strict';

const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 3000;

function start (route, handle) {
  function onRequest (request, response) {
    let pathname = url.parse(request.url).pathname;
    console.log('The following pathname was requested:', pathname);
    route(handle, pathname, request, response);
  }

  http.createServer(onRequest).listen(PORT, function(){
    console.log('server started on port:', PORT);
  });
}

exports.start = start;
