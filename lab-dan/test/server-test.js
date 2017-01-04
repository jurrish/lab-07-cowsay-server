const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);

const app = require('../index');

describe('this is a basic test of my server', function () {
  it('should be up and running after the start function is called', function () {
    expect(app.listening).to.be.true;
  });
  it('should get a 200 response for \'/\'', function(done) {
    chai.request(app)
      .get('/')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.text;
        done();
      });
  });
  it('should get a 200 response for a GET request to \'/cowsay?text=test\'', function(done) {
    chai.request(app)
    .get('/cowsay?text=test')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.text;
      done();
    });
  });
  it('should get a 200 response for a POST \'/cowsay\'', function(done) {
    chai.request(app)
    .post('/cowsay')
    .send({ text: 'test'})
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.text;
      done();
    });
  });
  it('should get a 400 response for \'/cowsay\'', function(done) {
    chai.request(app)
    .get('/cowsay')
    .end(function(err, res) {
      expect(res).to.have.status(400);
      expect(res).to.be.text;
      done();
    });
  });
  it('should get a 400 response for an incorrect POST \'/cowsay\'', function(done) {
    chai.request(app)
    .post('/cowsay')
    .send({ test: 'error'})
    .end(function(err, res) {
      expect(res).to.have.status(400);
      expect(res).to.be.text;
      done();
    });
  });
  after(function (done) {
    app.close(function () {
      done();
    });
  });
});
