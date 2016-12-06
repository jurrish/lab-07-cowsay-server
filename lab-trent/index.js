'use strict';

const http = require('http');

const requestParser = require('./lib/requestparser');

const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req, res) {

});

server.listen(PORT);
