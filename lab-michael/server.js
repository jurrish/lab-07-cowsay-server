'use strict';

// Assign Goblal Vars
const http = require('http');
const url = require('url');
const queryString = require('querystring');

const parseBody = require('./lib/bodyParser.js');
const cowsay = require('cowsay');  // Moooooo

module.exports = exports = {};

const PORT = process.env.PORT || 3000;  //usr def or 3000

// Create the server request
