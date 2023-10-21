import chai from 'chai';
import { errorHandler } from '../middleware';
import server from '../index';

chai.should();

describe('ErrorHandler middleware', function () {
  it('should handle an error with status code and message', function () {
    const err = new Error('Not Found');
    err.statusCode = 404;
    const req = {};
    const res = {
      status(statusCode) {
        this.statusCode = statusCode;
        return this;
      },
      json(body) {
        this.body = body;
      },
    };
    const next = function () {};
    errorHandler(err, req, res, next);
    res.statusCode.should.equal(404);
    res.body.code.should.equal(404);
    res.body.message.should.equal('Not Found');
    res.body.error.should.equal(err);
  });

  it('should handle an error with only message', function () {
    const err = new Error();
    const req = {};
    const res = {
      status(statusCode) {
        this.statusCode = statusCode;
        return this;
      },
      json(body) {
        this.body = body;
      },
    };
    const next = function () {};
    errorHandler(err, req, res, next);
    res.statusCode.should.equal(500);
    res.body.code.should.equal(500);
    res.body.message.should.equal('Internal Server Error');
    res.body.error.should.equal(err);
  });

  it('should return an not found', function (done) {
    chai
      .request(server)
      .get('/random-words')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
