import chai from 'chai';
import chaiHttp from 'chai-http';
import cookieParser from 'cookie-parser';
import server from '../index.js';

chai.should();
chai.use(chaiHttp);
chai.use(cookieParser);

const userDetails = {
  email: 'testing@example.com',
  password: 'Qwert@12345',
};

const reviewDetails = {
  feedback: 'Hi feedback test number 2',
  rating: '2',
};

describe('Testing Reviews', function () {
  let reviewId;
  it('Should Get all reviews on product', function (done) {
    chai
      .request(server)
      .get('/reviews/0f1548b0-b7ce-49e3-a2ef-baffffd383ab')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });
  it('Should Get Average Rating of a product', function (done) {
    chai
      .request(server)
      .get('/reviews/rating/c2d6f06c-ee3f-4918-986b-d3656d15216d')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('rating');
        done();
      });
  });
  it('Should Add a review to a product', function (done) {
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
          .post('/reviews/c2d6f06c-ee3f-4918-986b-d3656d15216d')
          .send(reviewDetails)
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            reviewId = res.body.data.id;
            done();
          });
      });
  });
  it('Should Remove a review from a product', function (done) {
    chai
      .request(server)
      .post('/users/login')
      .send(userDetails)
      .end(async (err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        const { token } = res.body;
        await chai
          .request(server)
          .delete(`/reviews/${reviewId}`)
          .set({ Authorization: `Bearer ${token}` })
          .then((res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
      });
  });
  it('Should Not Remove a review from a product that does not exist', function (done) {
    chai
      .request(server)
      .post('/users/login')
      .send(userDetails)
      .end(async (err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        const { token } = res.body;
        chai
          .request(server)
          .delete(`/reviews/d02bce8e-7b51-4b1e-88a6-8ccf7cf6dc72`)
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
          });
      });
  });
});
