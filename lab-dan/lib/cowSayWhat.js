'use strict';

const cowSay = require('cowSay');

module.exports = function bodyParser (string) {
  return cowSay.say({
    text: string,
    e: 'Oo',
    T: 'U ',
  }) + '\n';
};
