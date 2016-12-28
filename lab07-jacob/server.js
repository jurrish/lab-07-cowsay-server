const http = require('http');
const url = require('url');
const queryString = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/parse-body');

const PORT = process.env.PORT || 3000;

const server = http.createServer();


server.on('request', function(req, res) {
  var path = url.parse(req.url).pathname;
  var str = req.url.split('?')[1];
  var query = queryString.parse(str);  //thank you http://stackoverflow.com/questions/18769673/get-querystring-in-node-js
  if (req.method === 'POST' && path === '/cowsay') {
    parseBody(req, function() {
      if (req.body.text) { //if there is a text property in the body object of the request object
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(req.body.text);
        res.end(cowsay.say({text: req.body.text})); //make the cow say whatever string is in the value to the text property
      } else { //otherwise it was a bad request
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
      } // shell command to make this work: curl -H "Content-Type: application/json" -X POST -d '{"text": "moo!"}' http://localhost:3000
    });
  }
  else if (req.method === 'GET') { //if it's a get request
    if (path === '/') { //and the route is the home filepath
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('hello world'); //write hello world in the body of the response
    }
    else if (path =='/cowsay') {
      if (query.text) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(cowsay.say({text: query.text}));
      }
      else {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
      }
    }
  }
});

server.listen(PORT, function() {
  console.log('listening on port: ' + PORT);
});
