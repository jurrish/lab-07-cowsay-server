'use strict';

const url = require('url');
const cowSayWhat = require('./cowSayWhat');
const bodyParser = require('./bodyParser');

function responseWriter (response, code, string) {
  response.writeHeader(code, {'Content-Type':'text/plain'});
  response.write(string);
  response.end();
}

// this is for the index page
function greeter (request, response) {
  let text = 'Hello, World!';
  responseWriter(response, 200, text);
}

// this is for all 400 errors
function error (response, errorMessage) {
  let text = errorMessage ? errorMessage : 'bad request\ntry: localhost:3000/cowSayWhat?text=howdy';
  text = cowSayWhat(text);
  responseWriter(response, 400, text);
}

// this is for all standard get and post requests to /cowSayWhat
function cowsay (request, response) {
  if (request.method === 'POST') {
    bodyParser(request, function(err, data) {
      if (err) return error(response, err);
      if (data.text) return responseWriter(response, 200, cowSayWhat(data.text));
      error(response, 'Bad POST request.\n try this JSON: {"text": "howdy"}');
    });
  } else if (url.parse(request.url, true).query.text) {
    let text = cowSayWhat(url.parse(request.url, true).query.text);
    responseWriter(response, 200, text);
  } else {
    error(response);
  }
}

exports.greeter = greeter;
exports.error = error;
exports.cowsay = cowsay;
