import chai from 'chai';
import chaiHttp from 'chai-http';
import Jwt from 'jsonwebtoken';
import redisClient from '../helpers/redis.js';
import server from '../index.js';

chai.should();
chai.use(chaiHttp);

describe('Testing two factor authentication for sellers', function () {
  let token;
  before(function () {
    const body = {
      id: 'message',
    };
    token = Jwt.sign(body, process.env.JWT_SECRET);
  });

  it('should prompt for two-factor authentication when user is a seller', function (done) {
    const sellerUser = {
      email: 'newSeller@gmail.com',
      password: 'Ngabo@12345',
    };
    chai
      .request(server)
      .post('/users/login')
      .send(sellerUser)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('should return 200 status code and token if OTP is verified', async function () {
    await redisClient.setEx('newSeller@gmail.com', 300, `123456=${token}`);
    const res = await chai
      .request(server)
      .post('/users/verify/newSeller@gmail.com')
      .send({ verificationCode: '123456' });
    res.should.have.status(200);
  });
});
