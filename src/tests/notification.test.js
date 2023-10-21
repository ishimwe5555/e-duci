/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
import server from '../index.js';
import notificationUtils from '../utils/notificationUtils.js';

chai.should();
chai.use(chaiHttp);
chai.use(chaiAsPromised);
const { expect } = chai;

const userDetails = {
  email: 'testing@example.com',
  password: 'Qwert@12345',
};

describe('signup', function () {
  it('should send a notification email', async function () {
    const userData = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testuser',
    };
    const promise = notificationUtils.signup(userData);
    await expect(promise).to.be.fulfilled;
  });
});

describe('change Password', function () {
  it('should send a notification email', async function () {
    const userData = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testuser',
    };
    const promise = notificationUtils.changePassword(userData);
    await expect(promise).to.be.fulfilled;
  });
});

describe('Testing Notifications', function () {
  it('Should Get Notifications', function (done) {
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
          .get('/notifications/all')
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
      });
  });
  it('should return an HTML page with the correct headers', async function () {
    const res = await chai
      .request(server)
      .post('/users/login')
      .send(userDetails);
    chai.expect(res).to.have.status(200);
    const { token } = res.body;
    const result = await chai
      .request(server)
      .get(`/notifications?token=${token}`)
      .set('Accept', 'text/html')
      .set(
        'User-Agent',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      );
    chai.expect(result).to.have.status(200);
    chai.expect(result).to.be.html;
    chai
      .expect(result)
      .to.have.header('content-type', 'text/html; charset=UTF-8');
  });
  it('should return the CSS file', function (done) {
    chai
      .request(server)
      .get('/notifications/style.css')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.have.header('content-type', 'text/css; charset=UTF-8');
        done();
      });
  });
});
