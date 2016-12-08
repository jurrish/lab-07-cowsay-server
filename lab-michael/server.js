'use strict';

// Assign Goblal Vars
const http = require('http');
const url = require('url');
const queryString = require('querystring');

const parseBody = require('./lib/bodyParser.js');

const cowsay = require('cowsay');  // Moooooo


const PORT = process.env.PORT || 3000;  //usr def or 3000

// module.exports = exports = {};
// Create the server request
const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);
  console.log(req.method);

  if(req.url.pathname === '/') {
    res.writeHead(200,
      {'Content-Type': 'text/plain'});
    res.write('Hello World\n');
    res.end();
    return;
  }
  // GET REQUEST
  if (req.method === 'GET' && req.url.pathname ==='/cowsay') {

    if (req.url.query.text) {
      res.writeHead(200,
        {'Content-Type': 'text/plain'});
      let queryCowText = req.url.query.text;
      res.write(cowsay.say({text: queryCowText}));
      res.end();
    } else {
      res.writeHead(400,
        {'Content-Type': 'text/plain'});
      res.end();
    }
    return;
  }

// POST REQUEST
  if(req.method === 'POST' && req.url.pathname ==='/cowsay') {
    parseBody(req, function(err) {
      if(err) return console.log(err);
      if(req.body.text) {
        res.writeHead(200,
          {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: req.body.text}));
        res.end();
      } else {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
        res.end();
      }
    });
    return;
  }

  res.statusCode = 404;
  res.write(cowsay.say({text: 'OOPS!\n Pathname not found\n'}));
  res.end();

});

server.listen(PORT, function() {
  console.log('The server is now listening d(- -)b  on', PORT);
});









