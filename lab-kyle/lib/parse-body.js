'use strict';

module.exports = function(req) {
  req.body = '';

  req.on('data', function(data) {
    res.body += data.toString();
  });
};
