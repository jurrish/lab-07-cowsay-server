'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const cowsay = require('cowsay');

require('../server.js');

describe('testing cowsay routes', function() {
  describe('testing GET routes', function() {

    it('should respond with 200 and HELLO WORLD', function(done) {
      request.get('localhost:3000/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.equal('HELLO WORLD' + '\n');
        done();
      });
    });

    it('should respond with 200 and meow animal saying MOOO', function(done) {
      request.get('localhost:3000/cowsay?text=MOOO&animal=meow')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.equal(cowsay.say({f: 'meow', text: 'MOOO'}) + '\n');
        done();
      });
    });

    it('should respond with 400 if anything else', function(done) {
      request.get('localhost:3000/cow')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy&animal=meow'}) + '\n');
        done();
      });
    });
  });

  describe('testing POST routes', function() {
    it('should respond with 200 and cow', function(done) {
      request.post('localhost:3000/cowsay')
      .send({text: 'Hihi'})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.equal(cowsay.say({text: 'Hihi'}) + '\n');
        done();
      });
    });

    it('should respond with 400 for anything else', function(done) {
      request.post('localhost:3000/say')
      .send({text: 'Hihi'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}) + '\n');
        done();
      });
    });
  });
});
