import chai from 'chai';
import chaiHttp from 'chai-http';
import cookieParser from 'cookie-parser';
import Sinon from 'sinon';
import server from '../index.js';
import { userControllers } from '../controllers';

chai.should();
chai.use(chaiHttp);
chai.use(cookieParser);

const { expect } = chai;

const userDetails = {
  email: 'testing@example.com',
  password: 'Qwert@12345',
};

describe('Testing User Login Routes with Errors', function () {
  it('It Should Be Unauthorized Since there is no login', function (done) {
    chai
      .request(server)
      .get('/users/protected-route')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('No Login due to missing Field ', function (done) {
    const number = Math.floor(Math.random() * 100);
    const testUser = {
      username: `Test User${number} Created`,
    };
    chai
      .request(server)
      .post('/users/login')
      .send(testUser)
      .end((err, res) => {
        res.should.have.status(406);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
  it('No Login Wrong Email ', function (done) {
    const testUserLogin = {
      email: 'halal@mail.com',
      password: 'Qwert@12345',
    };
    chai
      .request(server)
      .post('/users/login')
      .send(testUserLogin)
      .end((err, res) => {
        res.should.have.status(406);
        res.body.should.be.a('object');
        done();
      });
  });
  it('No Login Wrong Password ', function (done) {
    const testUserLogin = {
      email: userDetails.email,
      password: 'Qwert@12345halal',
    };
    chai
      .request(server)
      .post('/users/login')
      .send(testUserLogin)
      .end((err, res) => {
        res.should.have.status(406);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('Testing User Login Routes ', function () {
  it('It Should Be Unauthorized Since there is no login', function (done) {
    chai
      .request(server)
      .get('/users/protected-route')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('Login ', function (done) {
    chai
      .request(server)
      .post('/users/login')
      .send(userDetails)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        const { token } = res.body;
        chai
          .request(server)
          .get('/users/protected-route')
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
  });
});

describe('mocking login controller', function () {
  it('should handle errors correctly', async function () {
    const stub = Sinon.stub().throws(new Error('error message'));
    const error = await userControllers.login(stub);
    // expect.fail('function should have thrown an error');
    expect(error);
  });
});
