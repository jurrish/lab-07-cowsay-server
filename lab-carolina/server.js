// const parseBody = require('lib/parsebody.js');
const cowsay = require('cowsay');
const http = require('http');
const url = require('url');
const queryString = require('querystring');

const PORT = process.env.PORT || 3000;

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
    res.write(cowsay.say({f: 'dragon', text: 'You gave me nothing to say!'}));
    res.end();
  }




});

server.listen(PORT, function(){
  console.log('listening on port ' + PORT);
});
