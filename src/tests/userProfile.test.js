import chai from 'chai';
import { v4 as uuidv4 } from 'uuid';
import chaiHttp from 'chai-http';
import app from '../index.js';
import { generateToken, hashPassword } from '../utils/index';
import { userServices, userProfileServices } from '../services';
import { redisClient } from '../helpers';
import { isAuthenticated } from '../middleware/index.js';
import sequelize from '../database/config/db.js';

const { expect } = chai;
chai.use(chaiHttp);

const userInfo = {
  email: 'testing@example.com',
  password: 'Qwert@12345',
};

const testuser1 = {
  id: '123',
  displayName: 'John Doe',
  email: 'johndoe@example.com',
};
const userProfiles = {
  names: 'John doe',
  gender: 'male',
  birthdate: '2023-01-01',
  language: 'fr',
  city: 'kigali',
  street: 'KS street01',
  currency: 'FRW',
  postalCode: '00000',
  country: 'Country',
  accountNumber: '129010328',
  accountName: 'BK',
  telephone: '+250780088171',
};
describe('User Details Controller', function () {
  let token;
  let user;
  before(async function () {
    user = await userServices.getUserByEmail(userInfo.email);
    const res = await chai.request(app).post('/users/login').send(userInfo);
    token = res.body.token;
  });

  describe('Post /signup', function () {
    let newUserIn;
    it('should create new user with null profile details', async function () {
      const newdata = {
        email: 'newusercreatetesting@gmail.com',
        username: 'newusercreatetesting',
        password: 'Qwertz234@',
      };
      const response = await chai
        .request(app)
        .post(`/users/signup`)
        .send(newdata);
      newUserIn = await userServices.getUserByEmail(newdata.email);
      const newdataProfiles = await userProfileServices.getUserProfilesById(
        newUserIn.id
      );
      expect(response).to.have.status(201);
      expect(newdataProfiles.names).to.equal('');
      expect(newdataProfiles).to.be.a('object');
      const userCreated = await userServices.getUserByUsername(
        newdata.username
      );
      await userServices.deleteUser(userCreated.id);
    });
  });
  describe('Get /users/profiles', function () {
    it('should not get users profile when  not logged in', async function () {
      const res = await chai
        .request(app)
        .get(`/users/profile`)
        .send(userProfiles);
      expect(res).to.have.status(401);
    });
    it('should successful get userInfo)', async function () {
      const res = await chai
        .request(app)
        .get(`/users/profile`)
        .set({ Authorization: `Bearer ${token}` });
      expect(res).to.have.status(200);
    });
  });
  describe('PUT /users/profile', function () {
    it('should Update new user details when valid data is provided', async function () {
      const res = await chai
        .request(app)
        .put(`/users/profile`)
        .set({ Authorization: `Bearer ${token}` })
        .send(userProfiles);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'Successfully updated');
      expect(res.body).to.be.a('object');
    });
    it('should update user details that previously added)', async function () {
      const res = await chai
        .request(app)
        .put(`/users/profile`)
        .set({ Authorization: `Bearer ${token}` })
        .send({
          ...userProfiles,
          gender: 'female',
          currency: 'RWF',
          language: 'Kiny',
        });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'Successfully updated');
      expect(res.body).to.be.a('object');
    });
    it('should update previous details that update nothing', async function () {
      const res = await chai
        .request(app)
        .put(`/users/profile`)
        .set({ Authorization: `Bearer ${token}` })
        .send();
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'Successfully updated');
      expect(res.body).to.be.a('object');
    });
    it('should update user details if some optional data are not there', async function () {
      const res = await chai
        .request(app)
        .put(`/users/profile`)
        .set({ Authorization: `Bearer ${token}` })
        .send({
          postalCode: '00000',
          country: 'Country',
          accountName: 'BK',
          telephone: '+250780088171',
        });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'Successfully updated');
    });
    it('should return 400, when user is logged in with invalid token', async function () {
      const res = await chai
        .request(app)
        .put(`/users/profile`)
        .set({ Authorization: `Bearer ass${token}` })
        .send(userProfiles);
      expect(res).to.have.status(400);
    });
    it('should return 401, when user is not logged in', async function () {
      const res = await chai
        .request(app)
        .put(`/users/profile`)
        .send(userProfiles);
      expect(res).to.have.status(401);
    });
    it('should return 406, when disobey the schema', async function () {
      const res = await chai
        .request(app)
        .put(`/users/profile`)
        .set({ Authorization: `Bearer ${token}` })
        .send({ ...userProfiles, gender: 'M' });
      expect(res).to.have.status(406);
    });

    it('should return 406 Bad Request, when updating user profiles with null params ', async function () {
      const res = await chai
        .request(app)
        .put(`/users/profile`)
        .set({ Authorization: `Bearer ${token}` })
        .send({
          ...userProfiles,
          gender: '',
          currency: '',
        });
      expect(res).to.have.status(406);
      expect(res.body).to.have.property('error');
      const resDel = await chai
        .request(app)
        .put(`/users/profile`)
        .set({ Authorization: 'Bearer 321910398420cwdweded2qd2dw' })
        .send(userProfiles);
      chai.expect(resDel).to.have.status(400);
    });
  });
  let newUser;
  let newToken;
  let newUserId;
  describe('User Details check for different user', function () {
    const otherUserProfiles = {
      names: 'smith sina',
      gender: 'other',
      birthdate: '2000-02-02',
      language: 'En',
      city: 'New York',
      street: 'KN 107',
      currency: 'USD',
      postalCode: '77777776',
      country: 'Kenya',
      accountNumber: '3345687',
      accountName: 'PkT',
      telephone: '+12329447009',
    };
    before(async function () {
      await sequelize.getQueryInterface().bulkInsert(
        'users',
        [
          {
            id: uuidv4(),
            username: 'testaasxxtesting',
            email: 'testaasxxtesting@testing.com',
            password: await hashPassword('Qwert@12345'),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
      newUser = await userServices.getUserByEmail(
        'testaasxxtesting@testing.com'
      );
      newUserId = newUser.dataValues.id;
      const res = await chai.request(app).post('/users/login').send({
        email: newUser.dataValues.email,
        password: 'Qwert@12345',
      });
      newToken = res.body.token;
    });
    after(async function () {
      await userProfileServices.deleteUserProfiles(newUserId);
      await userServices.deleteUser(newUserId);
    });
    it('should create user details if not exists', async function () {
      const res = await chai
        .request(app)
        .put(`/users/profile`)
        .set({ Authorization: `Bearer ${newToken}` })
        .send(otherUserProfiles);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'Successfully updated');
    });
    it('should Update user Details obeying the model', async function () {
      const res = await chai
        .request(app)
        .put(`/users/profile`)
        .set({ Authorization: `Bearer ${newToken}` })
        .send({
          ...otherUserProfiles,
          postalCode: '3434343',
          country: 'Rwanda',
          accountName: 'Equity',
          telephone: '+08678848947',
        });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'Successfully updated');
    });
    it('should return 400, when user is logged in with invalid token', async function () {
      const res = await chai
        .request(app)
        .put(`/users/profile`)
        .set({ Authorization: `Bearer as${newToken}` })
        .send(otherUserProfiles);
      expect(res).to.have.status(400);
    });
    it('should return 401, when user is not logged in', async function () {
      const res = await chai
        .request(app)
        .put(`/users/profile`)
        .send(otherUserProfiles);
      expect(res).to.have.status(401);
    });
    it('should return 406, when disobey the schema', async function () {
      const res = await chai
        .request(app)
        .put(`/users/profile`)
        .set({ Authorization: `Bearer ${newToken}` })
        .send({ ...otherUserProfiles, gender: 'M' });
      expect(res).to.have.status(406);
    });
    it('should not pass the authentication test because the tokens do not match', async function () {
      const testToken = generateToken(testuser1);
      redisClient.setEx(testuser1.id, 86400, 'token');
      const req = {
        headers: {
          authorization: `Bearer ${testToken}`,
        },
      };
      const res = {
        status(statusCode) {
          this.statusCode = statusCode;
          return this;
        },
        json(data) {
          this.body = data;
        },
      };
      await isAuthenticated(req, res);
    });
    it('should return 500, when user creadentials has been added by an other user ', async function () {
      const res = await chai
        .request(app)
        .put(`/users/profile`)
        .set({ Authorization: `Bearer ${newToken}` })
        .send({ ...userProfiles, accountNumber: '129010328', gender: '' });
      expect(res).to.have.status(500);
      expect(res.body).to.be.a('object');
    });
  });
  after(async function () {
    await userProfileServices.deleteUserProfiles(newUserId);
    await userProfileServices.deleteUserProfiles(user.id);
    await userServices.deleteUser(newUserId);
  });
});
