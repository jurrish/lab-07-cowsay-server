'use strict';

const http = require('http');

const requestParser = require('./lib/requestparser');
const cowsayRes = require('./lib/cowsayres');

const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req, res) {
  requestParser.parseUrlData(req);
  req.body = requestParser.parseBody(req);

  if (req.url.pathname === '/') {
    cowsayRes.resPlainText(res, 200, 'hello world');
  } else if (req.url.pathname === '/cowsay') {
    if (req.method === 'GET' || req.method === 'POST') {
      let input = req.url.query.text || req.body.text;
      if (input) {
        cowsayRes.resPlainText(res, 200, cowsayRes.cowsayGet({ text: input }));
      } else {
        cowsayRes.resPlainText(res, 400, cowsayRes.cowsayGet({ text: 'bad request\ntry: localhost:3000/cowsay?text=howdy' }));
      }
    } else {
      console.log('Incoming unused method: ' + req.method);
      cowsayRes.resPlainText(res, 501, 'No endpoint set up for ' + req.method);
    }
  }
});

server.listen(PORT, function() {
  console.log('Cowsay server listening on port: ' + PORT);
});
