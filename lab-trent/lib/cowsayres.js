'use strict';

const cowsay = require('cowsay');

exports.resPlainText = function(res, statusCode, text) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'text/plain');
  res.write(text);
  res.end();
};

exports.cowsayGet = function(query) {
  return cowsay.say(query);
};
