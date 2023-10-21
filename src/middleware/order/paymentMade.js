import { orderServices } from '../../services';

const madePayment = async (req, res, next) => {
  const { orderId } = req.params;
  const orderData = await orderServices.getOrderById(orderId);
  if (orderData.status === 'succeeded') {
    return res
      .status(401)
      .json({ code: '401', message: ' Already made payment for this order' });
  }
  next();
};

export default madePayment;
