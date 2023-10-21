import chai, { expect } from 'chai';
import assert from 'assert';
import chaiHttp from 'chai-http';
import cookieParser from 'cookie-parser';
import server from '../index.js';
import { wishListServices } from '../services';

chai.should();
chai.use(chaiHttp);
chai.use(cookieParser);

describe('Testing add product to the wishlist', function () {
  const wishlist = {
    userId: 'a2dc8d71-457f-4e6d-baeb-6623bd424156',
  };
  const testUserLogin = {
    email: 'testingwishlist@example.com',
    password: 'Qwert@12345',
  };
  const newuser = {
    email: 'orderuser@example.com',
    password: 'Qwert@12345',
  };
  after(async function () {
    const wishlistIds = [
      '5c2918e4-9482-412a-9c30-1acd08cb5dbb',
      '01d313c5-8167-4ca7-84d5-ed52b465f2dc',
    ];
    await Promise.all(
      wishlistIds.map((id) => wishListServices.deleteWishlist(id))
    );
    await Promise.all(
      wishlistIds.map((id) => wishListServices.deleteWishlist(id))
    );
  });

  it(' Should get all the products from user wishlist. ', function (done) {
    chai
      .request(server)
      .post('/users/login')
      .send(testUserLogin)
      .end((err, res) => {
        res.should.have.status(200);
        const { token } = res.body;
        chai
          .request(server)
          .get('/wishlist/all')
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
  });
  it(' Should add product to the wishlist ', function (done) {
    chai
      .request(server)
      .post('/users/login')
      .send(testUserLogin)
      .end((err, res) => {
        res.should.have.status(200);
        const { token } = res.body;
        chai
          .request(server)
          .post('/wishlist/products/add/46e6ce84-5427-46cc-ac7e-11b747daefed')
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            res.should.have.status(201);
            done();
          });
      });
  });

  it(' Should remove product from wishlist ', function (done) {
    chai
      .request(server)
      .post('/users/login')
      .send(testUserLogin)
      .end((err, res) => {
        res.should.have.status(200);
        const { token } = res.body;
        chai
          .request(server)
          .delete('/wishlist/products/delete/:pid')
          .set({ Authorization: `Bearer ${token}` })
          .send(wishlist)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
  });
  // adding to wishlist for the first time
  it(' Should add product to the wishlist for the first time', function (done) {
    chai
      .request(server)
      .post('/users/login')
      .send(newuser)
      .end((err, res) => {
        res.should.have.status(200);
        const { token } = res.body;
        chai
          .request(server)
          .post('/wishlist/products/add/46e6ce84-5427-46cc-ac7e-11b747daefed')
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            res.should.have.status(201);
            done();
          });
      });
  });
});

describe('Testing all services', function () {
  it('should create a new wishlist for the given user ID', async function () {
    const userId = '353a6ac5-656f-402e-82b9-79997fb6a04e';
    const wishlist = await wishListServices.createWishlist(userId);

    expect(wishlist).to.be.an('object');
  });
  it('should remove an item from an array', function () {
    const array = [1, 2, 3, 4];
    const itemToRemove = 2;
    const expectedArray = [1, 3, 4];

    assert.deepEqual(
      wishListServices.removeItem(array, itemToRemove),
      expectedArray
    );
  });
});
