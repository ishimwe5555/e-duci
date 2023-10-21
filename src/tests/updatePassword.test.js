import chai from 'chai';
import chaiHttp from 'chai-http';
import cookieParser from 'cookie-parser';
import server from '../index.js';
import { hashPassword } from '../utils/password.js';
import userServices from '../services/user.services.js';

chai.should();
chai.use(chaiHttp);
chai.use(cookieParser);

describe('Testing update password Route', function () {
  before(async function () {
    const password = await hashPassword('Qwert@12345');
    const testUser = {
      email: 'zester101@mail.com',
      username: 'zester101',
      password,
    };
    await userServices.createUser(testUser);
  });
  after(async function () {
    const user = await userServices.getUserByUsername('zester101');
    await userServices.deleteUser(user.dataValues.id);
  });
  it('should not update password if old is incorrect', async function () {
    // Create a user with a unique ID
    const user = {
      email: 'zester101@mail.com',
      password: 'Qwert@12345',
    };

    // Log in as the user and get the session ID
    const agent = chai.request.agent(server);
    const response = await agent
      .post('/users/login')
      .send({ email: user.email, password: user.password });

    const { token } = response.body;

    // Make a request to the update-password endpoint with the user ID and session ID as authentication
    const res = await chai
      .request(server)
      .patch('/users/change-password')
      .set({ Authorization: `Bearer ${token}` })
      .send({ oldPassword: 'Qwert@1234567', newPassword: 'Qwert@123456' });
    // Expect the response to have a status code of 401 and an error message
    chai.expect(res).to.have.status(401);
    chai
      .expect(res.body)
      .to.be.an('object')
      .to.have.property('message', 'Incorrect password');
  });
  it('should not update password if old and new is same', async function () {
    // Create a user with a unique ID
    const user = {
      email: 'zester101@mail.com',
      password: 'Qwert@12345',
    };

    // Log in as the user and get the session ID
    const agent = chai.request.agent(server);
    const response = await agent
      .post('/users/login')
      .send({ email: user.email, password: user.password });

    const { token } = response.body;

    // Make a request to the update-password endpoint with the user ID and session ID as authentication
    const res = await chai
      .request(server)
      .patch('/users/change-password')
      .set({ Authorization: `Bearer ${token}` })
      .send({ oldPassword: 'Qwert@12345678', newPassword: 'Qwert@12345678' });
    // Expect the response to have a status code of 401 and an error message
    chai.expect(res).to.have.status(406);
    chai
      .expect(res.body)
      .to.be.an('object')
      .to.have.property('error')
      .that.equals('Password is Invalid');
  });
  it('should not update password if token is invalid', async function () {
    // Create a user with a unique ID
    const user = {
      email: 'zester101@mail.com',
      password: 'Qwert@123456',
    };

    // Log in as the user and get the session ID
    const agent = chai.request.agent(server);
    const response = await agent
      .post('/users/login')
      .send({ email: user.email, password: user.password });

    const { token } = response.body;

    // Make a request to the update-password endpoint with the user ID and session ID as authentication
    const res = await chai
      .request(server)
      .patch('/users/change-password')
      .set({ Authorization: `Bearer ${token}n` })
      .send({ oldPassword: 'Qwert@12345678', newPassword: 'Qwert@123456789' });
    // Expect the response to have a status code of 404 and an error message
    chai.expect(res).to.have.status(400);
    chai.expect(res.body).to.be.an('object').to.have.property('error');
  });
  it('should update password successfully', async function () {
    // Create a user with a unique ID
    const user = {
      email: 'zester101@mail.com',
      password: 'Qwert@12345',
    };

    // Log in as the user and get the session ID
    const agent = chai.request.agent(server);
    const response = await agent
      .post('/users/login')
      .send({ email: user.email, password: user.password });

    const { token } = response.body;

    // Make a request to the update-password endpoint with the user ID and session ID as authentication
    const res = await chai
      .request(server)
      .patch('/users/change-password')
      .set({ Authorization: `Bearer ${token}` })
      .send({ oldPassword: 'Qwert@12345', newPassword: 'Qwert@123456' });
    // Expect the response to have a status code of 401 and an error message
    chai.expect(res).to.have.status(200);
    chai
      .expect(res.body)
      .to.be.an('object')
      .to.have.property('message', 'Password updated successfully');
  });
});
