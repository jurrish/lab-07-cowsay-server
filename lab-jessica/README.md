# Cowsay App

This app uses a simple http server to return a talking animal of your choice through a get request. You may also post a talking cow.

## Starting the Server

`node server.js`

## Server Endpoints

### GET request to /

This simply returns a string saying 'Hello World'.

### GET request to /cowsay

Use a query string to return a specific cowfile and message.

Example curl command: curl 'localhost:3000/cowsay?text=message&animal=dragon'

### POST request to /cowsay

You may POST a talking cow by posting to /cowsay.

Example curl command: curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X POST -d '{"text": "message"}' localhost:3000/cowsay
