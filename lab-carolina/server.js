// const parseBody = require('lib/parsebody.js');
const cowsay = require('cowsay');
const http = require('http');
const url = require('url');
const queryString = require('querystring');

const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req, res){
  req.url = url.parse(req.url);


  if(req.url.pathname === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(cowsay.say({f: 'ghostbusters', text: 'hello world'}));
    res.end();
    return;
  }

  if(req.url.pathname === '/cowsay' && req.method === 'GET') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(cowsay.say({f: 'ghostbusters', text: 'hello world'}));
    res.end();
    return;
  }



});

server.listen(PORT, function(){
  console.log('listening on port ' + PORT);
});
