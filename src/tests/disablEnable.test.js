import sinon from 'sinon';
import assert from 'assert';
import User from '../database/models/user.model';
import { userServices } from '../services';

describe('disableOtp', function () {
  it('should disable two-factor authentication for the specified user', async function () {
    const user = { id: 1, tfa_enabled: true, save: sinon.stub().resolves() };
    sinon.stub(User, 'findByPk').returns(user);

    await userServices.disableOtp(1);

    assert.strictEqual(user.tfa_enabled, false);

    sinon.restore();
  });
});

describe('enableOtp', function () {
  it('should enable two-factor authentication for the specified user', async function () {
    const user = { id: 1, tfa_enabled: false, save: sinon.stub().resolves() };
    sinon.stub(User, 'findByPk').returns(user);

    await userServices.enableOtp(1);

    assert.strictEqual(user.tfa_enabled, true);

    sinon.restore();
  });
});
