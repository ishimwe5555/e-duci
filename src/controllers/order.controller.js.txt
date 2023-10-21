import { orderServices, userServices, notificationServices } from '../services';
import orderService from '../services/order.service';

const getOrdersByUser = async (req, res) => {
  const userId = req.user.id;
  const user = await userServices.getUserById(userId);
  const orders = await orderServices.getOrdersByUser(userId);

  return res.status(200).json({
    code: '200',
    message: `Fetched all orders of the user ${user.username}`,
    data: { orders },
  });
};

const getOrderByUser = async (req, res) => {
  const { orderId } = req.params;
  const order = await orderServices.getOrderById(orderId);

  notificationServices.sendNotification(
    order.userId,
    `The requested order is ${order.status}`,
    'Order status',
    'low'
  );
  return res.status(200).json({
    code: '200',
    order,
  });
};

const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const updatedOrder = await orderServices.updateOrderStatus(
    orderId,
    req.body.status
  );
  notificationServices.sendNotification(
    updatedOrder.userId,
    'Order status is changed successfully',
    'Order status update',
    'mid'
  );

  return res.status(200).json({
    code: '200',
    message: 'Order status updated successfully',
    data: updatedOrder,
  });
};

const getOrders = async (req, res) => {
  const all = await orderService.getOrders();
  return res.status(200).json({
    code: '200',
    message: 'Order',
    orders: all,
  });
};

export { getOrdersByUser, updateOrderStatus, getOrderByUser, getOrders };
