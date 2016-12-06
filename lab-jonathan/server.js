let http = require('http');
let fs = require('fs');
let parseBody = require('./lib/parse-body.js');
let url = require('url');
let querystring = require('querystring');
let cowsay = require('cowsay');
let PORT = process.env.PORT || 3000;


let server = http.createServer(function(req, res){
  let path = url.parse(req.url);
  let query = querystring.parse(path.query);
  if(req.method === 'GET' && path === '/'){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(cowsay.say({text: 'hello world'}));
    res.end();
  }

  if(req.method === 'GET' && path.pathname === '/cowsay'){
    if(path.query){
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: query.message}));
      res.end();
    }
    else {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: 'bad request/ntry: localhost:3000/cowsay?text=howdy'}));
      res.end();
    }

    if(req.method === 'POST' && path.pathname === '/cowsay'){
      parseBody(req, function(err){
        if(err) return console.err(err);
      });
      if(path.query){
        fs.createReadStream('./server.js').pipe(res);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: query.message}));
        res.end();
      }
    }
    else {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: 'bad request/ntry: localhost:3000/cowsay?text=howdy'}));
      res.end();
    }
  }
});



server.listen(3000, function(){
  console.log('server is up');
});

// exports.server = server;
