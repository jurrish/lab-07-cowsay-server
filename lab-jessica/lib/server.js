// Create a HTTP Server using the http module
const http = require('http');
const url = require('url');
const queryString = require('querystring');
const cowsay = require('cowsay');
const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);
  console.log('req.url.query', req.url.query.text);
  console.log('req.url', req.url);
  console.log('req.method', req.method);
  console.log('req.headers', req.headers);

  if (req.method === 'GET' && req.url.pathname === '/cowsay'){
    const message = req.url.query.text;
    if(message) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: message}) + '\n');
    }
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write(cowsay.say({text:'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
  }
  // POST REQUEST
  //
  // the response header should include Content-Type: text/plain
  // if the json {text: messsage} is set in the body, respond with:
  // a status code of 200
  // a body including the value returned from cowsay.say({text: <querystring text>})
  // if the json{text: messsage}is not set in the body, respond with:
  // status code = 400
  // a body including the value returned from cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'})

  // if (req.method === 'POST'){
  //   parseBody(req, function(err){
  //     if (err) return console.error(err);
  //   });
  // }

  res.end();
});

server.listen(PORT, function () {
  console.log('server running on port', PORT);
});
