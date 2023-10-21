import {
  stripeToken,
  paymentMethod,
  charge,
  stripeListener,
  getStatus,
} from '../utils';
import { orderServices } from '../services';
import { sendEmailReset, stripe } from '../helpers';

const { ADMIN_EMAIL } = process.env;
const makePayment = async (req, res) => {
  const { orderId } = req.params;
  const token = await stripeToken(req.body);
  const method = await paymentMethod(token.id);
  const amount = req.orderAmount;
  const chargeBody = {
    amount,
    method: method.id,
    orderId,
    userId: req.user.id,
  };
  const payment = await charge(chargeBody);
  if (
    payment.status === 'requires_action' &&
    payment.next_action.type === 'redirect_to_url'
  ) {
    const redirectUrl = payment.next_action.redirect_to_url.url;
    return res.status(401).json({
      code: '401',
      Message: 'Additional action required',
      Action: redirectUrl,
    });
  }
  return res
    .status(200)
    .json({ code: '200', Message: 'Payment succedded', payment });
};

const webhook = async (req) => {
  try {
    const body = JSON.stringify(req.body, null, 2);
    const secret = process.env.WEBHOOK_SECRET;
    const header = stripe.webhooks.generateTestHeaderString({
      payload: body,
      secret,
    });
    const event = stripe.webhooks.constructEvent(body, header, secret);
    const data = await stripeListener(event);
    if (data) {
      if (data.status === 'succeeded') {
        const status = await getStatus('succeeded');
        const update = await orderServices.paymentOrderStatus(
          status,
          data.metadata.orderId
        );
        return update;
      }
      if (data.status === 'requires_action') {
        const status = await getStatus('requires_action');
        const update = await orderServices.paymentOrderStatus(
          status,
          data.metadata.orderId
        );
        return update;
      }
      if (data.status === 'requires_payment_method') {
        const status = await getStatus('requires_payment_method');
        const update = await orderServices.paymentOrderStatus(
          status,
          data.metadata.orderId
        );
        return update;
      }
    }
  } catch (error) {
    const mailBody = {
      email: ADMIN_EMAIL,
      subject: 'webhook error',
      html: `the error is: ${error.message}`,
    };
    sendEmailReset(mailBody);
    return true;
  }
};

const redirect = async (req, res) => {
  const paymentIntentId = req.query.payment_intent;
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  if (paymentIntent) {
    res.status(200).json({
      code: '200',
      message: 'Returned payment Status',
      status: paymentIntent.status,
    });
  }
};

export default { makePayment, webhook, redirect };
