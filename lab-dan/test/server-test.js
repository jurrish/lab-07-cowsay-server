const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);

const server = require('../server');
let myServer = undefined;

describe('this is a basic test of my server', function () {
  before(function () {
    myServer = server.start();
  });
  it('should be up and running after the start function is called', function () {
    expect(myServer.listening).to.be.true;
  });
  it('should get a Hello World response', function() {
    chai.request(myServer)
      .get('/')
      .end(function(err, res) {
        expect(res).to.have.status(200); 
        done();
      });
  });
  after(function (done) {
    myServer.close(function () {
      done();
    });
  });
});
