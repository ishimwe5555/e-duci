import chai from 'chai';
import chaiHttp from 'chai-http';
import { beforeEach } from 'mocha';
import app from '../index.js';
import { cartServices } from '../services';
import { redisClient } from '../helpers';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

describe('add items to their cart ', function () {
  const testUserLogin = {
    email: 'testing@example.com',
    password: 'Qwert@12345',
  };
  after(function () {
    redisClient.del('cart_353a6ac5-656f-402e-82b9-79997fb6a04e');
  });
  it('should Add item to their cart', async function () {
    const res = await chai
      .request(app)
      .post('/users/login')
      .send(testUserLogin);
    const { token } = res.body;
    const id = '0f1548b0-b7ce-49e3-a2ef-baffffd383ab';
    const response = await chai
      .request(app)
      .post(`/cart/${id}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(response).to.have.status(201);
    const respose = await chai
      .request(app)
      .patch(`/cart/reduce/${id}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(respose).to.have.status(406);
    const respo = await chai
      .request(app)
      .patch(`/cart/add/${id}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(respo).to.have.status(200);
    const resp = await chai
      .request(app)
      .patch(`/cart/add/${id}?quantity=10`)
      .set({ Authorization: `Bearer ${token}` });
    expect(resp).to.have.status(200);
  });
  it('should Add item to their cart for secord time', async function () {
    const res = await chai
      .request(app)
      .post('/users/login')
      .send(testUserLogin);
    const { token } = res.body;
    const id = '0f1548b0-b7ce-49e3-a2ef-baffffd383ab';
    const response = await chai
      .request(app)
      .post(`/cart/${id}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(response).to.have.status(201);
  });
  it('should decreased cart for the fisrt time', async function () {
    const res = await chai
      .request(app)
      .post('/users/login')
      .send(testUserLogin);
    const { token } = res.body;
    const pid = '0f1548b0-b7ce-49e3-a2ef-baffffd383ab';
    const response = await chai
      .request(app)
      .patch(`/cart/reduce/${pid}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(response).to.have.status(200);
    const respo = await chai
      .request(app)
      .patch(`/cart/reduce/${pid}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(respo).to.have.status(200);
    const resp = await chai
      .request(app)
      .patch(`/cart/reduce/${pid}?quantity=10`)
      .set({ Authorization: `Bearer ${token}` });
    expect(resp).to.have.status(200);
  });
  it('should not decreased cart', async function () {
    const res = await chai
      .request(app)
      .post('/users/login')
      .send(testUserLogin);
    const { token } = res.body;
    const pid = '0f1548b0-b7ce-49e3-a2ef-baffffd383aa';
    const response = await chai
      .request(app)
      .patch(`/cart/reduce/${pid}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(response).to.have.status(406);
  });
  it('should not increased cart', async function () {
    const res = await chai
      .request(app)
      .post('/users/login')
      .send(testUserLogin);
    const { token } = res.body;
    const pid = '0f1548b0-b7ce-49e3-a2ef-baffffd383ad';
    const response = await chai
      .request(app)
      .patch(`/cart/add/${pid}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(response).to.have.status(406);
  });
  it('should Add Createcart', async function () {
    const cart = await cartServices.createCart(
      '8bf0b72d-ac1c-4abe-ae94-0ed65test'
    );
    expect(cart).to.be.a('array');
  });
  it('should not Add item to their cart', async function () {
    const res = await chai
      .request(app)
      .post('/users/login')
      .send(testUserLogin);
    const { token } = res.body;
    const id = '0f1548b0-b7ce-49e3-a2ef-baffffd383aa';
    const response = await chai
      .request(app)
      .post(`/cart/${id}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(response).to.have.status(404);
  });
  it('should Add quantity one ', async function () {
    const res = await chai
      .request(app)
      .post('/users/login')
      .send(testUserLogin);
    const { token } = res.body;
    const id = '0f1548b0-b7ce-49e3-a2ef-baffffd383ab';
    const respo = await chai
      .request(app)
      .patch(`/cart/add/${id}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(respo).to.have.status(200);
  });
  it('should clear the cart successfully', async function () {
    const res = await chai
      .request(app)
      .post('/users/login')
      .send(testUserLogin);
    const newToken = res.body.token;
    const response = await chai
      .request(app)
      .delete(`/cart/clear`)
      .set({ Authorization: `Bearer ${newToken}` });
    expect(response).to.have.status(200);
  });
});

// test view cart
describe('Get /cart items ', function () {
  const testUserLogin = {
    email: 'testing@example.com',
    password: 'Qwert@12345',
  };
  beforeEach(async function () {
    await redisClient.set(
      `cart_353a6ac5-656f-402e-82b9-79997fb6a04e`,
      JSON.stringify([
        { productId: '0f1548b0-b7ce-49e3-a2ef-baffffd383ab', quantity: 2 },
      ])
    );
  });
  it('should view all items in cart successfully', async function () {
    const res = await chai
      .request(app)
      .post('/users/login')
      .send(testUserLogin);
    const { token } = res.body;
    const response = await chai
      .request(app)
      .get(`/cart`)
      .set({ Authorization: `Bearer ${token}` });
    expect(response).to.have.status(200);
  });

  it('should  reutrn 401, when not logged in', async function () {
    const response = await chai.request(app).get(`/cart`);
    expect(response).to.have.status(401);
  });

  it('should return 500 error when there is a server error', async function () {
    const res = await chai
      .request(app)
      .post('/users/login')
      .send(testUserLogin);
    const { token } = res.body;
    const { getCart } = cartServices;
    cartServices.getCart = () => {
      throw new Error('internal server down');
    };
    const response = await chai
      .request(app)
      .get(`/cart`)
      .set({ Authorization: `Bearer ${token}` });
    expect(response).to.have.status(500);
    cartServices.getCart = getCart;
  });
});
