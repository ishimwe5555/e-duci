/* eslint-disable mocha/no-top-level-hooks */
// eslint-disable-next-line import/no-extraneous-dependencies
import redis from 'redis-mock';
import Sinon from 'sinon';

global.assert = require('assert');

let redisClientStub;

before(function () {
  redisClientStub = Sinon.stub(redis, 'createClient').returns(
    redis.createClient()
  );
  Sinon.assert.calledOnce(redisClientStub);
});

afterEach(function () {
  Sinon.restore();
});
