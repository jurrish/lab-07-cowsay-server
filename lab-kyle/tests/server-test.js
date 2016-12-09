const assert = require('assert');
const server = require('../server.js');
const cowsay = require('cowsay');
const http = require('http');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

const port = process.env.PORT || 3000;

describe('a server module', function() {
  before(function(done) {
    server.listen(port);
    done();
  });
  after(function(done) {
    server.close();
    done();
  });

  describe('GET method', function() {

    describe('"/" endpoint', function() {
      it('should return simple text', function(done) {
        chai.request(server)
          .get('/')
          .end(function(err, res) {
            expect(res.text.toString()).to.equal('hello world');
            done();
          });
      });
    });

    describe('"/cowsay" endpoint', function() {
      describe('without a querystring', function() {
        it('should return a status code of 400', function(done) {
          chai.request(server)
            .get('/cowsay')
            .end(function(err, res) {
              res.should.have.status(400);
              done();
            });
        });
        it('should return a cowsay object with bad request', function(done) {
          chai.request(server)
            .get('/cowsay')
            .end(function(err, res) {
              expect(res.text.toString()).to.equal(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
              done();
            });
        });
      });
      describe('with a querystring text value', function() {
        it('should return a cowsay object containing the query text', function(done) {
          chai.request(server)
            .get('/cowsay?text=hello')
            .end(function(err, res) {
              expect(res.text.toString()).to.equal(cowsay.say({text: 'hello'}));
              done();
            });
        });
      });
      describe('with a querystring text value and animal value', function() {
        it('should return a cowsay object containing the query text and animal', function(done) {
          chai.request(server)
            .get('/cowsay?text=hello&animal=dragon')
            .end(function(err, res) {
              expect(res.text.toString()).to.equal(cowsay.say({text: 'hello', f: 'dragon'}));
              done();
            });
        });
      });
    });
  });
  describe('POST method', function(){
    describe('without body data sent', function() {
      it('should return a status code of 400', function(done) {
        chai.request(server)
          .post('/cowsay')
          .send({})
          .end(function(err, res) {
            res.should.have.status(400);
            done();
          });
      });
      describe('with body data sent', function() {
        it('should return a cowsay object containing the query text', function(done) {
          chai.request(server)
            .post('/cowsay')
            .send({'text': 'hello'})
            .end(function(err, res) {
              expect(res.text.toString()).to.equal(cowsay.say({text: 'hello'}));
              done();
            });
        });
      });
    });
  });
});
