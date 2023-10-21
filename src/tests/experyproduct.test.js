import { assert } from 'chai';
import sinon from 'sinon';
import cron from 'node-cron';
import ExpiredProduct from '../jobs/ExpiryProductDate';
import { productsServices } from '../services';

describe('Expired product check', function () {
  let scheduleSpy;

  beforeEach(function () {
    scheduleSpy = sinon.spy(cron, 'schedule');
  });

  afterEach(function () {
    scheduleSpy.restore();
  });

  it('should schedule a cron job', async function () {
    await ExpiredProduct();
    assert.isTrue(scheduleSpy.calledOnce);
    assert.strictEqual(
      scheduleSpy.args[0][0],
      process.env.PRODUCT_CRON_SCHEDULE
    );
    scheduleSpy.restore();
  });
  it('should return an array of expired products', async function () {
    const productExp = await productsServices.expiredProductDate();
    assert.isArray(productExp);
  });
});
