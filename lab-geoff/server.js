'use strict';

let http = require('http');
let url = require('url');
let querystring = require('querystring');

let PORT = 3000;

let server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  console.log(req.url.path);
  req.url.query = querystring.parse(req.url.query);
  console.log(req.url.query);

  res.writeHead(200, {
    'Content-type' : 'text/plain',
  });
  res.write('hello world \n');
  res.end();

  if(req.method === 'POST') {
    console.log('post request block');
    //parse body stuff from handler
  }

  if(req.method === 'GET' && req.url.pathname === '/cowsay') { //add and for /cowsay
    console.log('cowsay get request block');

    // if(text = message) {
    //   status 200
    //   Content-type text/plain
    //   cowsay querystring text
    // }
    //
    // if (!text = message) {
    //   status 400
    //   Content-type text/plain
    //   cowsay specific message in assignment
    // }
    //fs read stream from some file for query string?
  }

});

server.listen(PORT, function() {
  console.log('server running on port ' + PORT);
});

