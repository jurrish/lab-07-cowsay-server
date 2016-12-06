const http = require('http');
const url = require('url');
const queryString = require('querystring');
const cowsay = require('cowsay');
const fs = require('fs');
const parseBody = require('./lib/parse-body');

const PORT = process.env.PORT || 3000;

const server = http.createServer();


server.on('request', function(req, res) {
  var path = url.parse(req.url).pathname;
  var str = req.url.split('?')[1];
  var query = queryString.parse(str);  //thank you http://stackoverflow.com/questions/18769673/get-querystring-in-node-js
  if (req.method === 'POST') {
    parseBody(req, function() {
      console.log(req);
    });
  }
  else if (req.method === 'GET') {
    if (path === '/') {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('hello world');
    }
    else if (path ==='/cowsay') {
      if (query.text) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(cowsay.say({text: query.text}));
      }
      else {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
      }
      // res.writeHead(200, {'Content-Type': 'text/plain'})
    }
  }
});

server.listen(PORT, function() {
  console.log('listening on port: ' + PORT);
});
