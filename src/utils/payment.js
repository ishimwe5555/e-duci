// eslint-disable-next-line import/no-cycle
import { stripe } from '../helpers';

const { DEPLOYED_URL } = process.env;
async function stripeToken(cardBody) {
  const token = await stripe.tokens.create({
    card: {
      number: cardBody.cardNumber,
      exp_month: cardBody.expMonth,
      exp_year: cardBody.expYear,
      cvc: cardBody.cvc,
    },
  });
  return token;
}

async function paymentMethod(tokenId) {
  const methodId = await stripe.paymentMethods.create({
    type: 'card',
    card: {
      token: tokenId,
    },
  });
  return methodId;
}

async function charge(chargeBody) {
  const payment = await stripe.paymentIntents.create({
    amount: chargeBody.amount * 100,
    currency: 'usd',
    payment_method: chargeBody.method,
    capture_method: 'automatic',
    confirm: true,
    metadata: {
      userId: chargeBody.userId,
      orderId: chargeBody.orderId,
      totalPrice: chargeBody.amount,
    },
    error_on_requires_action: false,
    setup_future_usage: 'off_session',
    return_url: `${DEPLOYED_URL}/checkout/redirect`,
  });
  return payment;
}

async function stripeListener(event) {
  const { object } = event.data;
  if (event.type === 'payment_intent.requires_action') {
    const paymentIntent = event.data.object;
    if (paymentIntent.next_action.type === 'redirect_to_url') {
      const pendingBody = {
        status: object.status,
        metadata: object.metadata,
      };
      return pendingBody;
    }
  } else if (event.type === 'payment_intent.succeeded') {
    const successBody = {
      status: object.status,
      metadata: object.metadata,
    };
    return successBody;
  } else if (event.type === 'payment_intent.payment_failed') {
    const failedBody = {
      status: object.status,
      metadata: object.metadata,
    };
    return failedBody;
  } else {
    return false;
  }
}
async function getStatus(eventStatus) {
  if (eventStatus === 'succeeded') {
    return 'succeeded';
  }
  if (eventStatus === 'requires_action') {
    return 'incomplete';
  }
  return 'failed';
}

export { stripeToken, paymentMethod, charge, stripeListener, getStatus };
