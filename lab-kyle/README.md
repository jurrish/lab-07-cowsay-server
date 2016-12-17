# Lab 07 - Cowsay server

This app will make both GET and POST requests using the http module of node and send a
response using cowsay.

## Endpoints
To make a get request, simply make a request to the following endpoints.

* '/'    
  -example  'http://localhost:3000/'

* '/cowsay'
  -example  'http://localhost:3000/cowsay'

### GET request

When making a GET request to '/cowsay', you may include a querystring with a message for the cow to say. It must have a key value of 'text'.

  -example  'http://localhost:3000/cowsay?text=hello'

### POST request

When making a POST request you must include a json object in the body.

  -example '{"text": "message"}'
