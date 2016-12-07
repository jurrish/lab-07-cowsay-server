'use strict';

module.exports = function(req, res, cowsay, helper, callback) {
  req.body = '';

  req.on('data', function(data) {
    req.body += data;
    let parsedBody = JSON.parse(req.body);

    if(parsedBody.text) {
      helper(200, parsedBody.text);
    } else {
      helper(400, 'bad request\ntry: localhost:3000/cowsay?text=howdy');
    }
  });
};
