'use strict';

const server = require('./server');
const router = require('./lib/router');
const requestHandler = require('./lib/requestHandler');

let handle = {};
handle.error = requestHandler.error;
handle['/'] = requestHandler.greeter;
handle['/cowsay'] = requestHandler.cowsay;

let myApp = server.start(router.route, handle);

// for testing purposes
module.exports = myApp;
