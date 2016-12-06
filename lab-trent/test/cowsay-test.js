'use strict';

const cowsayRes = require('../lib/cowsayres');
const cowsay = require('cowsay');
const assert = require('assert');

describe('CowsayResponse', function() {
  describe('#cowsayGet()', function() {
    it('should return cowsay based on the body/text given', function() {
      assert.equal(cowsayRes.cowsayGet({ text: 'whoah' }), cowsay.say({ text: 'whoah' }));
    });
  });
});
