import chai from 'chai';
import chaiHttp from 'chai-http';
import productControllers from '../controllers/product.controller';
import server from '../index';

chai.use(chaiHttp);

describe('listItems', function () {
  const collectionId = '51ea5366-ea5c-4501-9ade-4cd50009c84c';
  const testUserLogin = {
    email: 'testingseller@example.com',
    password: 'Qwert@12345',
  };
  it('should get All products from a collection.', function (done) {
    chai
      .request(server)
      .post('/users/login')
      .send(testUserLogin)
      .end(async (err, res) => {
        res.should.have.status(200);
        const { token } = res.body;
        chai
          .request(server)
          .get(`/products/list-items/${collectionId}`)
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
      });
  });

  it('should get all products.', function (done) {
    chai
      .request(server)
      .get(`/products/all`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('listAllItems', function () {
  it('should return a list of all products when called', function () {
    const req = {};
    const res = {
      status: (statusCode) => ({
        json: () => {
          expect(statusCode).to.equal(200);
        },
      }),
    };
    productControllers.listAllItems(req, res);
  });
});
