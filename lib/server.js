'use strict';

const http = require('http');
const cowsay = require('cowsay');
const fs = require('fs');
const url = require('url');
const queryString = require('querystring');
// const parseBody = require('./lib/parse-body');
const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req, res){
  console.log(req, res);
});

server.listen(PORT, () => {
  console.log('serving port 3000');
});
