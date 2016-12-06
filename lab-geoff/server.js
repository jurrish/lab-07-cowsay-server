'use strict';

let http = require('http');
let url = require('url');
let querystring = require('querystring');
let cowsay = require('cowsay');

let PORT = process.env.PORT || 3000;

let server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  console.log(req.url.path);
  req.url.query = querystring.parse(req.url.query);
  console.log(req.url.query);

  // res.writeHead(200, {
  //   'Content-type' : 'text/plain',
  // });
  // console.log(cowsay.say({
  //   text: 'i am cow',
  // }));
  // res.write('hello world \n');
  // res.end();

  if(req.method === 'POST') {
    console.log('post request block');
    //parse body stuff from handler
  }

  if(req.method === 'GET' && req.url.pathname === '/cowsay') {
    console.log('cowsay get request block');
    if(req.url.query.text) {
      console.log('text equals message');
      res.writeHead(200, {
        'Content-type': 'text/plain',
      });
      res.write(cowsay.say({
        text: `\n${req.url.query.text}\n`,
        e: '00',
      }) + '\n');
      res.end();
    } else {
      console.log('text does not equal message');
      res.writeHead(400, {
        'Content-type': 'text/plain',
      });
      res.write(cowsay.say({
        text: 'bad request\ntry: localhost:3000/cowsay?text=howdy',
        e: 'xx',
        T: 'U ',
      }) + '\n');
      res.end();
    }
  }
});

server.listen(PORT, function() {
  console.log('server running on port ' + PORT);
});

