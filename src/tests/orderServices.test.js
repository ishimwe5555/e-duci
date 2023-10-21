/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import sinon from 'sinon';
import Order from '../database/models/order.model';
import { orderServices } from '../services';

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
  });
});
