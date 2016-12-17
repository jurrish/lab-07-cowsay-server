'use strict';


module.exports = function(req, callback) {
  req.on('data', function(data) {
    let string = JSON.parse(data.toString());
    callback(string);
  });
};