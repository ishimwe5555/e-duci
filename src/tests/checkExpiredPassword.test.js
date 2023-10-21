import { assert } from 'chai';
import sinon from 'sinon';
import cron from 'node-cron';
import User from '../database/models/user.model';
import sequelize from '../database/config/db';
import checkExpiredPassword from '../jobs/checkExpiredPassword';

describe('checkExpiredPassword', function () {
  let scheduleSpy;

  beforeEach(function () {
    scheduleSpy = sinon.spy(cron, 'schedule');
  });

  afterEach(function () {
    scheduleSpy.restore();
  });

  it('should schedule a cron job', async function () {
    await checkExpiredPassword();
    assert.isTrue(scheduleSpy.calledOnce);
    assert.strictEqual(scheduleSpy.args[0][0], process.env.CRON_SCHEDULE);
    scheduleSpy.restore();
  });

  it('should return an array of expired users', async function () {
    const expiredUsers = await User.findAll({
      where: sequelize.literal(`
    NOW() - "lastPasswordUpdate" > INTERVAL '${process.env.PASSWORD_EXPIRY}'
  `),
    });

    assert.isArray(expiredUsers);
  });
  it('should return expired users', async function () {
    const expiredUsers = await User.findAll({
      where: sequelize.literal(`
    NOW() - "lastPasswordUpdate" < INTERVAL '${process.env.PASSWORD_EXPIRY}'
  `),
    });

    assert.isArray(expiredUsers);
  });
});
