import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import { redisClient } from '../helpers';

chai.should();
chai.use(chaiHttp);
const userId = '353a6ac5-656f-402e-82b9-79997fb6a04e';
const testUser = {
  email: 'testing@example.com',
  password: 'Qwert@12345',
};

describe('Testing Marking notifications as read', function () {
  before(async function () {
    await redisClient.set(
      `noti_${userId}`,
      JSON.stringify([
        {
          id: '0f1548b0-b7ce-49e3-a2ef-baffffd383aa',
          notificationId: '4b3fb8e7-5667-4153-a4a4-b7681c784e6f',
          title: 'Reviews',
          message: 'Review Added.',
          level: 'low',
          read: false,
          date: '2023-04-28T10:32:55.591Z',
        },
        {
          id: '0f1548b0-b7ce-49e3-a2ef-baffffd383aa',
          notificationId: '793c438b-1486-46ec-9bad-d9563a2356b0',
          title: 'Reviews',
          message: 'Review Added.',
          level: 'low',
          read: false,
          date: '2023-04-28T10:33:42.612Z',
        },
      ])
    );
  });
  it('Mark one notification as read', function (done) {
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
          .post('/notifications/793c438b-1486-46ec-9bad-d9563a2356b0/read')
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
      });
  });
  it('Mark All notification as read', function (done) {
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
          .post('/notifications/read')
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
      });
  });
});
