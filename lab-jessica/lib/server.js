const http = require('http');
const url = require('url');
const queryString = require('querystring');
const cowsay = require('cowsay');
const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);

  const path = req.url.pathname;
  const message = req.url.query.text;

  console.log('req.url.query', req.url.query.text);
  console.log('req.url', req.url);
  console.log('req.method', req.method);
  console.log('req.headers', req.headers);

  if(req.method === 'GET' && path === '/cowsay'){
    if(message) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(cowsay.say({text: message}) + '\n');
    } else {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.end(cowsay.say({text:'bad request\ntry: localhost:3000/cowsay?text=howdy'}) + '\n');
    }
  }

  // if the json {text: messsage} is set in the body, respond with:
  // a status code of 200
  // if(req.method === 'POST' && path === '/cowsay') {
  //   //   parseBody(req, function(err){
  //   //     if (err) return console.error(err);
  //   //   });
  //   if(message) {
  //     res.writeHead(200, {'Content-Type': 'text/plain'});
  //     res.write(cowsay.say({text: message}) + '\n');
  //   }
  //   res.writeHead(400, {'Content-Type': 'text/plain'});
  //   res.write(cowsay.say({text:'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
  // }
});

server.listen(PORT, function () {
  console.log('server running on port', PORT);
});
