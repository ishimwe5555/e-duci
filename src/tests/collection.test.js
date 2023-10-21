import chai from 'chai';
import chaiHttp from 'chai-http';
import cookieParser from 'cookie-parser';
import server from '../index.js';

chai.should();
chai.use(chaiHttp);
chai.use(cookieParser);

describe('Testing Collection', function () {
  const collectionId = '51ea5366-ea5c-4501-9ade-4cd50009c84c';
  const productId = '0f1548b0-b7ce-49e3-a2ef-baffffd383ab';
  const collectionDetails = {
    name: 'My collection',
  };

  const testUserLogin = {
    email: 'testingseller@example.com',
    password: 'Qwert@12345',
  };

  it(' Should create a Collection and delete collection ', function (done) {
    let cid;
    chai
      .request(server)
      .post('/users/login')
      .send(testUserLogin)
      .end(async (err, res) => {
        res.should.have.status(200);
        const { token } = res.body;
        await chai
          .request(server)
          .post('/products/create-collection')
          .set({ Authorization: `Bearer ${token}` })
          .send(collectionDetails)
          .then(async (res) => {
            res.should.have.status(201);
            cid = res.body.collection.id;
          });
        await chai
          .request(server)
          .post('/products/create-collection')
          .set({ Authorization: `Bearer ${token}` })
          .send(collectionDetails)
          .then(async (res) => {
            res.should.have.status(409);
          });
        await chai
          .request(server)
          .delete(`/products/${cid}/delete`)
          .set({ Authorization: `Bearer ${token}` })
          .send(collectionDetails)
          .then(async (res) => {
            res.should.have.status(200);
            done();
          });
      });
  });
  it(' Should create not delete collection which does not exist. ', function (done) {
    chai
      .request(server)
      .post('/users/login')
      .send(testUserLogin)
      .end(async (err, res) => {
        res.should.have.status(200);
        const { token } = res.body;
        await chai
          .request(server)
          .delete(`/products/e86c2276-35c0-4ace-b9d9-3bbf0f258014/delete`)
          .set({ Authorization: `Bearer ${token}` })
          .send(collectionDetails)
          .then(async (res) => {
            res.should.have.status(404);
          });
        await chai
          .request(server)
          .delete(`/products/e86c2276-35c0-4ace-b9d9-3bbf0f258014/delete`)
          .set({ Authorization: 'Bearer 321910398420cwdweded2qd2dw' })
          .send(collectionDetails)
          .then(async (res) => {
            res.should.have.status(400);
            done();
          });
      });
  });
  it('should get a product from a collection.', function (done) {
    chai
      .request(server)
      .get(`/products/${productId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });
  it(' Should delete a product from collection ', function (done) {
    chai
      .request(server)
      .post('/users/login')
      .send({ email: 'testingseller@example.com', password: 'Qwert@12345' })
      .end(async (err, res) => {
        res.should.have.status(200);
        const { token } = res.body;
        await chai
          .request(server)
          .delete(`/products/${collectionId}/delete/${productId}`)
          .set({ Authorization: `Bearer ${token}` })
          .send(collectionDetails)
          .then(async (res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
          });
        chai
          .request(server)
          .delete(`/products/${collectionId}/delete/${productId}`)
          .set({ Authorization: `Bearer ${token}` })
          .send(collectionDetails)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            done();
          });
      });
  });
});

describe('Testing Unknown collection id inputs ', function () {
  it('Should return empty array since the id does not exist on getting single product', function (done) {
    chai
      .request(server)
      .get('/products/44ddae3b-2c6e-444f-adde-e1e6e4730208')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data').eql([]);
        done();
      });
  });
  it('should not get a product from a collection. when id is invalid', function (done) {
    chai
      .request(server)
      .get('/products/iewkdvwemcv')
      .end((err, res) => {
        res.should.have.status(406);
        res.body.should.be.a('object');
        done();
      });
  });
});
