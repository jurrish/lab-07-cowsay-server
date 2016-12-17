// const parseBody = require('lib/parsebody.js');
const cowsay = require('cowsay');
const http = require('http');
const url = require('url');
const queryString = require('querystring');
const PORT = process.env.PORT || 3000;
const parseBody = require('./lib/parsebody.js');

const server = http.createServer(function(req, res){
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);

  if(req.url.pathname === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(cowsay.say({f: 'ghostbusters', text: 'hello world'}));
    res.end();
  }

  if (req.method === 'GET' && req.url.pathname === '/cowsay') {
    if (req.url.query.text) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({f: 'hellokitty', text: req.url.query.text}));
      res.end();
    }

    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write(cowsay.say({text: ' bad request\ntry: localhost:3000' + req.url.href}));
    res.end();
  }

  if (req.method === 'POST' && req.url.pathname === '/cowsay') {
    parseBody(req, function(err, body){
      if(err) return console.error(err);
      if(req.body.text){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: body}));
        res.end();
      } else {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: 'bad request\ntry: http POST :3000/cowsay text=="howdy"'}));
        res.end();
      }
    });
  }

});

server.listen(PORT, function(){
  console.log('listening on port ' + PORT);
});
