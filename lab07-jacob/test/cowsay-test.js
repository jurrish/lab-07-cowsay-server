const request = require('superagent');
const expect = require('chai').expect;

require('../server.js'); //this will start the server

describe('jacob\'s Cowsay server', function() {
  describe('the POST request', function() {
    it('should return a default 200 status code when a valid post request is made', function(done){
      request.post('http://localhost:3000/cowsay')
      .send({text: 'I\'m a Brown Holstein'})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should return a status code of 400 when an invalid post request is made', function(done) {
      request.post('http://localhost:3000/cowsay')
      .send('not a valid post')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('the GET request for Jacob\'s Cowsay server', function() {
    it('should return a default status code when a valid GET request is made', function(done) {
      request.get('http://localhost:3000/cowsay?text=milkme')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should return a 400 status code when an invalid GET request is made', function(done) {
      request.get('http://localhost:3000/cowsay?invalidrequest=yes')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
});
