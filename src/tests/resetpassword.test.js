import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { generateForgetPasswordToken } from '../utils';
import { userServices } from '../services';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

describe('create user then send a reset link', function () {
  it('should send reset link if the email is correct', async function () {
    const res = await chai
      .request(app)
      .post('/users/forgotPassword')
      .send({ email: 'testing@example.com' });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message');
  });
  it('should not send reset link due to wrong email', async function () {
    const res = await chai
      .request(app)
      .post('/users/forgotPassword')
      .send({ email: 'mirist@mail.com' });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('message');
  });
  it('should reset password if the token is corrent', async function () {
    const email = 'testing@example.com';
    const user = await userServices.getUserByEmail(email);
    const userEmail = { email, id: user.id };
    const token = generateForgetPasswordToken(userEmail);
    const res = await chai
      .request(app)
      .put(`/users/reset-password/${token}`)
      .send({ password: 'Qwert@12345' });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal(
      'You have reset successful your password'
    );
  });
});
describe('incorrent token', function () {
  it('should not send link due to invalid token', async function () {
    const incorrectToken = 'akwjanrkjdkafn';
    const res = await chai
      .request(app)
      .put(`/users/reset-password/${incorrectToken}`)
      .send({ password: 'Incorect@1token' });
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('message');
  });
});
describe('incorrent Url', function () {
  it('should not send link due url not found', async function () {
    const incorrectToken = 'akwjanrkjdkafn';
    const res = await chai
      .request(app)
      .put(`/users/res-password/${incorrectToken}`)
      .send({ password: 'Incorect@1token' });
    expect(res).to.have.status(404);
  });
});
describe('incorrent Url', function () {
  it('should not send link due url not found', async function () {
    const res = await chai
      .request(app)
      .put('/users/forforgotPasswor')
      .send({ password: 'Incorect@1token' });
    expect(res).to.have.status(404);
  });
});
describe('Server problem', function () {
  it('should not due to wrong request', async function () {
    const email = 'mirisaidiest@mail.com';
    const userEmail = { email };
    const token = generateForgetPasswordToken(userEmail);
    const res = await chai
      .request(app)
      .put(`/users/reset-password/${token}`)
      .send();
    expect(res).to.have.status(500);
    expect(res.body.message).to.equal('Server error');
  });
  it('should not due to wrong ur;', async function () {
    const email = 'mirisaidiest@mail.com';
    const userEmail = { email };
    const token = generateForgetPasswordToken(userEmail);
    const res = await chai
      .request(app)
      .put(`/uers/reset-password/${token}`)
      .send();
    expect(res).to.have.status(404);
  });
  it('should not due to wrong password;', async function () {
    const email = 'mirisaidiest@mail.com';
    const userEmail = { email };
    const token = generateForgetPasswordToken(userEmail);
    const res = await chai
      .request(app)
      .put(`/users/reset-password/${token}`)
      .send({ pasword: 'Incorect@1token' });
    expect(res).to.have.status(406);
  });
  it('should return hello word', async function () {
    const res = await chai.request(app).get('/users').send();
    expect(res).to.have.status(200);
  });
  it('should return hello word', async function () {
    const res = await chai.request(app).get('/user').send();
    expect(res).to.have.status(404);
  });
});
