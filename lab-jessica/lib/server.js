// Create a HTTP Server using the http module
const http = require('http');
const querystring = require('querystring');
const cowsay = require('cowsay');
const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req, res) {
  console.log(req.url.substring(0,1));

  if(req.url.substring(0,1) === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('hello world');
    res.end();
  }

  if(req.url.substring(0,7) === '/cowsay') {
    let message = querystring.parse(req.url);
    console.log(message);
    res.write(cowsay.say({text : 'I\'m a moooodule'}) + '\n');
    res.end();
  }

});



// /cowsay
//
// GET REQUEST
//
// the query string should have the key value text=<message>

// the response header should include Content-Type: text/plain
// if the query text=messsage is set, respond with:
// a status code of 200
// a body including the value returned from cowsay.say({text: <querystring text>})
// if the query text=message is not set, respond with:
// status code = 400
// a body including the value returned from cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'})


// POST REQUEST
//
// the response header should include Content-Type: text/plain
// if the json {text: messsage} is set in the body, respond with:
// a status code of 200
// a body including the value returned from cowsay.say({text: <querystring text>})
// if the json{text: messsage}is not set in the body, respond with:
// status code = 400
// a body including the value returned from cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'})


server.listen(PORT, function () {
  console.log('server running on port', PORT);
});
