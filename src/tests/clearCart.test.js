import chai from 'chai';
import chaiHttp from 'chai-http';
import cookieParser from 'cookie-parser';
import app from '../index.js';
import { cartServices } from '../services';

chai.should();
chai.use(chaiHttp);
chai.use(cookieParser);
const { expect } = chai;

describe('Get /cart items ', function () {
  const testUserLogin = {
    email: 'testing@example.com',
    password: 'Qwert@12345',
  };

  it('should  return 401, when not logged in', async function () {
    const response = await chai.request(app).delete(`/cart/clear`);
    expect(response).to.have.status(401);
  });

  it('should throw 404 error, when acesses wrong path', async function () {
    const resp = await chai
      .request(app)
      .post('/users/login')
      .send(testUserLogin);
    const { token } = resp.body;
    const response = await chai
      .request(app)
      .delete(`/ca-rt`)
      .set({ Authorization: `Bearer ${token}` });
    expect(response).to.have.status(404);
  });

  it('should return 500 error when there is a server error', async function () {
    const newLogin = await chai
      .request(app)
      .post('/users/login')
      .send(testUserLogin);
    const newToken = newLogin.body.token;
    const { clearCart } = cartServices;
    cartServices.clearCart = () => {
      throw new Error('internal server down');
    };
    const response = await chai
      .request(app)
      .delete(`/cart/clear`)
      .set({ Authorization: `Bearer ${newToken}` });
    expect(response).to.have.status(500);
    cartServices.clearCart = clearCart;
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
