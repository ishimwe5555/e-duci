import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { productsServices } from '../services';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

describe('search product', function () {
  const testUserLogin = {
    email: 'testing@example.com',
    password: 'Qwert@12345',
  };
  it('should return the search list', async function () {
    const res = await chai
      .request(app)
      .get('/products/search?minPrice=100&maxPrice=500000')
      .send();
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message');
  });
  it('should  return empty array', async function () {
    const res = await chai
      .request(app)
      .get('/products/search?key=pkzay')
      .send();
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('products');
  });
  it('should  return empty array when Min Price is great than Max Price', async function () {
    const res = await chai
      .request(app)
      .get('/products/search?minPrice=20000&maxPrice=1000')
      .send();
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('products');
  });
  it('should return 500 error when there is a server error', async function () {
    const res = await chai
      .request(app)
      .post('/users/login')
      .send(testUserLogin);
    const { token } = res.body;
    const { searchproduct } = productsServices;
    productsServices.searchproduct = () => {
      throw new Error(errorMessage);
    };
    const response = await chai
      .request(app)
      .get(`/products/search`)
      .set({ Authorization: `Bearer ${token}` });
    expect(response).to.have.status(500);
    productsServices.searchproduct = searchproduct;
  });
});
