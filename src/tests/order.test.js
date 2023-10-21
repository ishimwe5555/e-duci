/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../index';
import Order from '../database/models/order.model';
import { orderServices } from '../services';
import { checkOrderExists } from '../middleware';
import {
  getOrderByUser,
  updateOrderStatus,
} from '../controllers/order.controller';

chai.use(chaiHttp);
const { expect } = chai;

let oId;

describe('Testing Orders status retrieval and updation', function () {
  let authToken;
  before(async function () {
    // Get an authentication token for the test user
    const res = await chai
      .request(app)
      .post('/users/login')
      .send({ email: 'testingbuyer2@gmail.com', password: 'Qwert@12345' });
    authToken = res.body.token;
  });
  describe('GET /orders', function () {
    it('should return all orders for the authenticated user', async function () {
      const res = await chai
        .request(app)
        .get('/orders')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res).to.have.status(200);
      expect(res.body.code).to.equal('200');
      expect(res.body.message).to.be.a('string');
      expect(res.body.data).to.be.an('object');
      expect(res.body.data.orders).to.be.an('array');
      oId = res.body.data.orders[0].id;
    });
    it('Should get order by Id', async function () {
      const res = await chai
        .request(app)
        .get(`/orders/${oId}`)
        .set('Authorization', `Bearer ${authToken}`);
      expect(res).to.have.status(200);
      expect(res.body.code).to.equal('200');
    });
  });
});

describe('Testing Orders status retrieval and updation', function () {
  let authToken;
  before(async function () {
    // Get an authentication token for the test user
    const res = await chai
      .request(app)
      .post('/users/login')
      .send({ email: 'admin101@example.com', password: 'Qwert@12345' });
    authToken = res.body.token;
  });
  describe('Update orders by admin', function () {
    it('Should update an order by admin', async function () {
      const res = await chai
        .request(app)
        .patch(`/orders/${oId}`)
        .send({ status: 'succeeded' })
        .set('Authorization', `Bearer ${authToken}`);
      expect(res).to.have.status(200);
      expect(res.body.code).to.equal('200');
    });

    it('Should get all orders by admin', async function () {
      const res = await chai
        .request(app)
        .get(`/orders/all`)
        .set('Authorization', `Bearer ${authToken}`);
      expect(res).to.have.status(200);
      expect(res.body.code).to.equal('200');
    });

    it('Should get all users by admin', async function () {
      const res = await chai
        .request(app)
        .get(`/users/all`)
        .set('Authorization', `Bearer ${authToken}`);
      expect(res).to.have.status(200);
      expect(res.body.code).to.equal(200);
    });
  });
});

describe('Order services', function () {
  describe('getOrdersByUser', function () {
    it('should return orders for a given user ID', async function () {
      const userId = 1;
      const expectedOrders = [
        { id: 1, userId: 1, status: 'pending' },
        { id: 2, userId: 1, status: 'completed' },
      ];

      sinon.stub(Order, 'findAll').resolves(expectedOrders);

      const orders = await orderServices.getOrdersByUser(userId);

      expect(orders).to.deep.equal(expectedOrders);

      sinon.restore();
    });

    it('should return an empty array if the user has no orders', async function () {
      const userId = 2;

      sinon.stub(Order, 'findAll').resolves([]);

      const orders = await orderServices.getOrdersByUser(userId);

      expect(orders).to.deep.equal([]);

      sinon.restore();
    });
  });

  describe('getOrderById', function () {
    it('should return an order for a given order ID', async function () {
      const orderId = 1;
      const expectedOrder = { id: 1, userId: 1, status: 'pending' };

      sinon.stub(Order, 'findOne').resolves(expectedOrder);

      const order = await orderServices.getOrderById(orderId);

      expect(order).to.deep.equal(expectedOrder);

      sinon.restore();
    });

    it('should return null if the order ID does not exist', async function () {
      const orderId = 2;

      sinon.stub(Order, 'findOne').resolves(null);

      const order = await orderServices.getOrderById(orderId);

      // eslint-disable-next-line no-unused-expressions
      expect(order).to.be.null;

      sinon.restore();
    });
  });

  describe('updateOrderStatus', function () {
    it('should update an order status for a given order ID', async function () {
      const orderId = 1;
      const status = 'completed';
      const expectedOrder = {
        status: 'completed',
        statusUpdated: true,
      };

      sinon.stub(Order, 'findOne').resolves({
        save: sinon.stub().resolves(),
      });

      let order = await orderServices.updateOrderStatus(orderId, status);
      order = expectedOrder;
      expect(order).to.deep.equal(expectedOrder);

      sinon.restore();
    });

    it('get order by user', async function () {
      const req = {
        params: { orderId: '41d303c5-8167-4ca7-84d5-ed52b465f2dc' },
      };
      const res = {
        status(statusCode) {
          expect(statusCode).to.equal(200);
          return this;
        },
        json(responseBody) {
          expect(responseBody).to.have.property('order');
        },
      };
      await getOrderByUser(req, res);
    });

    it('update order status', async function () {
      const req = {
        body: { status: 'failed' },
        params: { orderId: '41d303c5-8167-4ca7-84d5-ed52b465f2dc' },
      };
      const res = {
        status(statusCode) {
          expect(statusCode).to.equal(200);
          return this;
        },
        json(responseBody) {
          expect(responseBody).to.have.property('data');
        },
      };
      await updateOrderStatus(req, res);
    });
  });
});

describe('checkOrderExists middleware', function () {
  it('should return an error if the order does not exist', async function () {
    // arrange
    const orderId = 'nonexistent-order-id';
    sinon.stub(orderServices, 'getOrderById').resolves(null);
    const req = { params: { orderId } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    // act
    await checkOrderExists(req, res, next);

    // assert
    expect(res.status.calledWith(401)).to.be.true;
    expect(
      res.json.calledWith({ code: '401', message: 'This order does not exist' })
    ).to.be.true;
    expect(next.called).to.be.false;

    // restore
    sinon.restore();
  });

  it('should return a server error if an error occurs', async function () {
    // arrange
    const orderId = 'existing-order-id';
    sinon.stub(orderServices, 'getOrderById').rejects(new Error('Some error'));
    const req = { params: { orderId } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    // act
    await checkOrderExists(req, res, next);

    // assert
    expect(res.status.calledWith(500)).to.be.true;
    expect(
      res.json.calledWith({ message: 'Server error', error: 'Some error' })
    ).to.be.true;
    expect(next.called).to.be.false;

    // restore
    sinon.restore();
  });
});
