import chai from 'chai';
import assert from 'assert';
import Jwt from 'jsonwebtoken';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../index';
import { redisClient, stripe } from '../helpers';
import { webhookBody } from '../utils';
import paymentController from '../controllers/payment.controller';
import Order from '../database/models/order.model';

chai.use(chaiHttp);
const { expect } = chai;

describe('Payment with stripe', function () {
  let token;
  let failStub;
  let authStub;
  let redirectStatus;
  let unknownStatus;

  before(function () {
    const body = {
      id: '01d313c5-8167-4ca7-84d5-ed52b465f2dc',
      username: 'orderUser',
      role: 'BUYER',
    };
    token = Jwt.sign(body, process.env.JWT_SECRET);
    redisClient.set(body.id, token);
  });
  after(async function () {
    await Order.update(
      { status: 'pending' },
      { where: { id: '41d303c5-8167-4ca7-84d5-ed52b465f2dc' } }
    );
  });

  it('should successfully make a payment', async function () {
    const successStub = sinon.stub().resolves({
      id: 'test-payment-id',
      status: 'succeeded',
    });
    sinon.stub(stripe.paymentIntents, 'create').callsFake(successStub);

    const body = {
      cardNumber: '4242424242424242',
      expMonth: '12',
      expYear: '2026',
      cvc: '123',
    };
    const res = await chai
      .request(app)
      .post('/checkout/payment/41d303c5-8167-4ca7-84d5-ed52b465f2dc')
      .set('authorization', `Bearer ${token}`)
      .send(body);
    expect(res).to.have.status(200);
    expect(res.body.payment.status).to.equal('succeeded');
    sinon.restore();
  });

  it('should fail to make a payment insuffient fund', async function () {
    failStub = sinon.stub(stripe.paymentIntents, 'create');
    failStub.rejects({
      statusCode: 402,
      code: 'card_declined',
      decline_code: 'expired_card',
    });

    const body = {
      cardNumber: '4000000000009995',
      expMonth: '12',
      expYear: '2026',
      cvc: '123',
    };
    const res = await chai
      .request(app)
      .post('/checkout/payment/41d303c5-8167-4ca7-84d5-ed52b465f2dc')
      .set('authorization', `Bearer ${token}`)
      .send(body);
    expect(res).to.have.status(402);
    failStub.restore();
  });

  it('payment that require 3d authentication', async function () {
    authStub = sinon.stub().resolves({
      id: 'test-payment-id',
      status: 'requires_action',
      next_action: {
        type: 'redirect_to_url',
        redirect_to_url: { url: 'https://stripe.com/c/b1aa980b-d82d-9381' },
      },
    });
    sinon.stub(stripe.paymentIntents, 'create').callsFake(authStub);

    const body = {
      cardNumber: '4000002500003155',
      expMonth: '12',
      expYear: '2026',
      cvc: '123',
    };
    const res = await chai
      .request(app)
      .post('/checkout/payment/41d303c5-8167-4ca7-84d5-ed52b465f2dc')
      .set('authorization', `Bearer ${token}`)
      .send(body);
    expect(res).to.have.status(401);
    sinon.restore();
  });

  it('tesing webhook with authentication payment', async function () {
    const body = webhookBody.authorization(
      '41d303c5-8167-4ca7-84d5-ed52b465f2dc'
    );
    const req = {
      body,
    };
    const res = {};
    const update = await paymentController.webhook(req, res);
    assert.ok(update);
  });

  it('tesing webhook with failed payment', async function () {
    const body = webhookBody.failed('41d303c5-8167-4ca7-84d5-ed52b465f2dc');
    const req = {
      body,
    };
    const res = {};
    const update = await paymentController.webhook(req, res);
    assert.ok(update);
  });

  it('tesing webhook with succedded payment', async function () {
    const body = webhookBody.succeeded('41d303c5-8167-4ca7-84d5-ed52b465f2dc');
    const req = {
      body,
    };
    const res = {};
    const update = await paymentController.webhook(req, res);
    assert.ok(update);
  });
  it('should fail as payment is already made', async function () {
    const successStub = sinon.stub().resolves({
      id: 'test-payment-id',
      status: 'succeeded',
    });
    sinon.stub(stripe.paymentIntents, 'create').callsFake(successStub);

    const body = {
      cardNumber: '4242424242424242',
      expMonth: '12',
      expYear: '2026',
      cvc: '123',
    };
    const res = await chai
      .request(app)
      .post('/checkout/payment/41d303c5-8167-4ca7-84d5-ed52b465f2dc')
      .set('authorization', `Bearer ${token}`)
      .send(body);
    expect(res).to.have.status(401);
    sinon.restore();
  });
  it('tesing webhook unexpected event', async function () {
    const body = webhookBody.unexpected('41d303c5-8167-4ca7-84d5-ed52b465f2dc');
    const req = {
      body,
    };
    const res = {};
    const update = await paymentController.webhook(req, res);
    assert.strictEqual(update, undefined);
  });
  it('should throw error', async function () {
    const req = {
      body: '',
    };
    const res = {};
    const result = await paymentController.webhook(req, res);
    assert.strictEqual(result, true);
  });

  it('should return the payment status', async function () {
    redirectStatus = sinon.stub().resolves({ status: 'succeeded' });
    sinon.stub(stripe.paymentIntents, 'retrieve').callsFake(redirectStatus);

    const res = await chai
      .request(app)
      .get('/checkout/redirect?payment_intent=pi_3N0vVeLoeSuOuPCC0FM7iTrG');
    expect(res).to.have.status(200);
    sinon.restore();
  });

  it('should not return the payment status', async function () {
    unknownStatus = sinon.stub(stripe.paymentIntents, 'retrieve');
    unknownStatus.rejects({ statusCode: 404, message: 'unkonwn status' });

    const res = await chai
      .request(app)
      .get('/checkout/redirect?payment_intent=pi_1N1vVeLoeSuOuPCC0FM7iTrG');
    expect(res).to.have.status(404);
    unknownStatus.restore();
  });

  it('order does not exist', async function () {
    const body = {
      cardNumber: '4000002500003155',
      expMonth: '12',
      expYear: '2026',
      cvc: '123',
    };
    const res = await chai
      .request(app)
      .post('/checkout/payment/11d303c5-8167-4ca7-84d5-ed52b465f2dc')
      .set('authorization', `Bearer ${token}`)
      .send(body);
    expect(res).to.have.status(401);
  });
});
