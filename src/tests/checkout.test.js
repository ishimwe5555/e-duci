import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import { checkShippingAddressExist, checkProductInStock } from '../middleware';
import { redisClient } from '../helpers';

chai.should();
chai.use(chaiHttp);

const testSellerUser = {
  email: 'testingseller09@example.com',
  password: 'Qwert@12345',
};

const testUser = {
  email: 'testingbuyer1@gmail.com',
  password: 'Qwert@12345',
};

const shippingAddressDetails = {
  firstName: 'testingbuyer',
  lastName: 'client',
  phoneNumber: '07062323233',
  streetAddress: 'kk938st',
  country: 'rwanda',
  city: 'kigali',
  postalCode: '0',
};

describe('Testing checkout', function () {
  before(async function () {
    await redisClient.set(
      `cart_1dcf1730-d004-4958-b00c-d23de98d808b`,
      JSON.stringify([
        { productId: 'a2dafc4b-35a3-44f5-84a4-e8772b37ca39', quantity: 2 },
      ])
    );
  });
  it('should not get the shipping address since the user is not a buyer', function (done) {
    chai
      .request(app)
      .post('/users/login')
      .send(testSellerUser)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        const { token } = res.body;
        chai
          .request(app)
          .get(`/users/shipping-address`)
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            done();
          });
      });
  });

  it('should get the shipping address of the buyer', function (done) {
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
          .get(`/users/shipping-address`)
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
      });
  });

  it('should add and update shipping address of the buyer', function (done) {
    const updatedShippingAddress = {
      firstName: 'testingbuyer',
      lastName: 'client',
      phoneNumber: '07062323233',
      country: 'rwanda',
      city: 'kigali',
      postalCode: '0',
      streetAddress: 'kkk999st',
    };
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
          .post(`/users/shipping-address`)
          .send(shippingAddressDetails)
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            chai
              .request(app)
              .patch(`/users/shipping-address`)
              .send(updatedShippingAddress)
              .set({ Authorization: `Bearer ${token}` })
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
              });
          });
      });
  });

  it('should check if the products in the cart are available in stock but the cart is empty', async function () {
    await redisClient.set(
      `cart_0f1548b0-b7ce-49e3-a2ef-baffffd390aa`,
      JSON.stringify([])
    );
    const req = {
      user: {
        id: '0f1548b0-b7ce-49e3-a2ef-baffffd390aa',
      },
    };
    const res = {
      status(statusCode) {
        this.statusCode = statusCode;
        expect(res).to.have.property('statusCode').to.equal(406);
        return this;
      },
      json(data) {
        this.body = data;
        expect(res.body)
          .to.have.property('message')
          .to.equal('Your cart is empty!');
      },
    };
    const next = () => {};

    await checkProductInStock(req, res, next);
  });

  it('should check if the products in the cart are available in stock', async function () {
    await redisClient.set(
      'cart_0f1548b0-b7ce-49e3-a2ef-baffffd390aa',
      JSON.stringify([
        {
          productId: '51ea5366-ea5c-4501-9ade-4cd51129c89c',
          quantity: 100000,
        },
      ])
    );
    chai
      .request(app)
      .post('/users/login')
      .send(testUser)
      .then(async (res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        const { token } = res.body;
        await chai
          .request(app)
          .post('/checkout')
          .set({ Authorization: `Bearer ${token}` })
          .then((res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('unavailableProducts');
            res.body.should.have
              .property('message')
              .to.equal('These product are less stock!');
          });
      });
  });

  it('should checkout successfully', function (done) {
    const buyer2 = {
      email: 'testingbuyer2@gmail.com',
      password: 'Qwert@12345',
    };
    chai
      .request(app)
      .post('/users/login')
      .send(buyer2)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        const { token } = res.body;
        chai
          .request(app)
          .post(`/checkout`)
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            done();
          });
      });
  });

  it('should check if the user has an existing shippingAddress', async function () {
    const req = {
      user: {
        id: '0f1548b0-b7ce-49e3-a2ef-baffffd390aa',
      },
    };
    const res = {
      status(statusCode) {
        this.statusCode = statusCode;
        expect(res).to.have.property('statusCode').to.equal(406);
        return this;
      },
      json(data) {
        this.body = data;
      },
    };
    const next = () => {};

    await checkShippingAddressExist(req, res, next);
  });
});
