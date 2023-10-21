import { orderServices } from '../../services';

const ckeckOrderExists = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const orderData = await orderServices.getOrderById(orderId);
    if (!orderData) {
      return res
        .status(401)
        .json({ code: '401', message: 'This order does not exist' });
    }
    req.orderAmount = orderData.totalPrice;
    next();
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

export default ckeckOrderExists;
