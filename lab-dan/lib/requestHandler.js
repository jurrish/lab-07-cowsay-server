'use strict';

const bodyParser = require('./bodyParser');
const url = require('url');

// this is for the index page
function greeter (request, response) {
  console.log('Greeter requestHandler called');
  response.writeHeader(200, {'Content-Type':'text/plain'});
  response.write('Hello, world!');
  response.end();
}

// this is for all 400 errors
function error (request, response) {
  console.log('Error requestHandler called');
  response.writeHeader(400, {'Content-Type':'text/plain'});
  response.write(bodyParser('bad request\ntry: localhost:3000/cowsay?text=howdy'));
  response.end();
}

// this is for all standard get requests to /cowsay
// this checks for a query with a property of "text" in the url
function cowSay (request, response) {
  console.log('cowSay requestHandler called');
  if (url.parse(request.url, true).query.text) {
    let text = url.parse(request.url, true).query.text;
    response.writeHeader(200, {'Content-Type':'text/plain'});
    response.write(bodyParser(text));
    response.end();
  } else {
    error (request, response);
  }
}

exports.greeter = greeter;
exports.error = error;
exports.cowSay = cowSay;
