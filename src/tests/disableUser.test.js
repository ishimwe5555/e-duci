import chai from 'chai';
import chaiHttp from 'chai-http';
import { userServices } from '../services';
import app from '../index.js';

chai.should();
chai.use(chaiHttp);

const userDetails = {
  email: 'admin101@example.com',
  password: 'Qwert@12345',
};

const testUser = {
  email: 'testing@example.com',
  password: 'Qwert@12345',
};

describe('Testing user status', function () {
  let user;
  before(async function () {
    user = await userServices.getUserByEmail(testUser.email);
  });
  it('should not disable user if not found', function (done) {
    chai
      .request(app)
      .post('/users/login')
      .send(userDetails)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        const { token } = res.body;
        chai
          .request(app)
          .patch('/users/disable/d0bdf042-1412-4d12-888b-bcd631dac9b9')
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            done();
          });
      });
  });
  it('should disable user ', function (done) {
    chai
      .request(app)
      .post('/users/login')
      .send(userDetails)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        const { token } = res.body;
        chai
          .request(app)
          .patch(`/users/disable/${user.id}`)
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            chai
              .request(app)
              .post('/users/login')
              .send({ email: 'testing@example.com', password: 'Qwert@12345' })
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                const Dtoken = res.body.token;
                chai
                  .request(app)
                  .get('/users/protected-route')
                  .set({ Authorization: `Bearer ${Dtoken}` })
                  .end((err, res) => {
                    res.should.have.status(406);
                    res.body.should.be.a('object');
                    chai
                      .request(app)
                      .patch(`/users/disable/${user.id}`)
                      .set({ Authorization: `Bearer ${token}` })
                      .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                      });
                  });
              });
          });
      });
  });
  it('should not disable user due to server error ', function (done) {
    chai
      .request(app)
      .post('/users/login')
      .send(userDetails)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        const { token } = res.body;
        chai
          .request(app)
          .patch('/users/disable/9c2f0aac-d04c-4de0-9530-fa0099339d0y')
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a('object');
            done();
          });
      });
  });
});
