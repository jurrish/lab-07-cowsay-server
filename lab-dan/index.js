'use strict';

const server = require('./server');
const router = require('./lib/router');
const requestHandler = require('./lib/requestHandler');

let handle = {};
handle.error = requestHandler.error;
handle['/'] = requestHandler.greeter;
handle['/cowsay'] = requestHandler.cowSay;

server.start(router.route, handle);
