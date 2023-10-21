import chai from 'chai';
import chaiHttp from 'chai-http';
import { userServices } from '../services';
import app from '../index.js';

chai.should();
chai.use(chaiHttp);

const adminDetails = {
  email: 'admin101@example.com',
  password: 'Qwert@12345',
};

const testUser = {
  email: 'testing@example.com',
  password: 'Qwert@12345',
};
describe('Testing user roles and permissions', function () {
  let user;
  before(async function () {
    user = await userServices.getUserByEmail(testUser.email);
  });
  it('should not change role of users since the user is not Admin', function (done) {
    chai
      .request(app)
      .post('/users/login')
      .send(testUser)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        const { token } = res.body;
        chai
          .request(app)
          .patch(`/users/${user.id}/role`)
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            done();
          });
      });
  });
  it('should  change role of users since the user is Admin', function (done) {
    chai
      .request(app)
      .post('/users/login')
      .send(adminDetails)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        const { token } = res.body;
        chai
          .request(app)
          .patch(`/users/${user.id}/role`)
          .send({ role: 'SELLR' })
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
          });
        chai
          .request(app)
          .patch(`/users/${user.id}/role`)
          .send({ role: 'SELLER' })
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            done();
          });
      });
  });
});
