import Order from '../database/models/order.model';

async function getOrdersByUser(userId) {
  const orders = await Order.findAll({ where: { userId } });
  return orders;
}

async function getOrderById(id) {
  const order = await Order.findOne({ where: { id } });
  return order;
}

async function updateOrderStatus(id, status) {
  const order = await Order.findOne({ where: { id } });
  order.status = status;
  order.statusUpdated = true;
  await order.save();
  return Order.findOne({ where: { id } });
}

async function paymentOrderStatus(status, id) {
  const data = await Order.update({ status }, { where: { id } });
  return data;
}
async function getOrders() {
  const data = await Order.findAll();
  return data;
}
export default {
  updateOrderStatus,
  getOrdersByUser,
  getOrderById,
  paymentOrderStatus,
  getOrders,
};
