const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);

const app = require('../index');

describe('This is a test of my full Cowsay app', function () {
  before(function () {
    expect(app.listening).to.be.true;
  });
  after(function (done) {
    app.close(function () {
      done();
    });
  });
});
