/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import { userServices } from '../services';
import { tfaEnableDisable } from '../controllers';

const { expect } = chai;
chai.use(chaiAsPromised);

describe('tfaEnableDisable', function () {
  let res, enableOtpStub, disableOtpStub;

  beforeEach(function () {
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    enableOtpStub = sinon.stub(userServices, 'enableOtp');
    disableOtpStub = sinon.stub(userServices, 'disableOtp');
  });

  afterEach(function () {
    enableOtpStub.restore();
    disableOtpStub.restore();
  });

  it('should enable TFA for a user who does not have it enabled', async function () {
    const req = { user: { id: 123, tfa_enabled: false } };
    await tfaEnableDisable(req, res);
    expect(enableOtpStub.calledWith(req.user.id)).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(
      res.json.calledWith({
        code: 200,
        message: 'OTP option enabled successfully',
      })
    ).to.be.true;
  });

  it('should disable TFA for a user who have it enabled', async function () {
    const req = { user: { id: 123, tfa_enabled: true } };
    await tfaEnableDisable(req, res);
    expect(disableOtpStub.calledWith(req.user.id)).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(
      res.json.calledWith({
        code: 200,
        message: 'OTP option disabled successfully',
      })
    ).to.be.true;
  });
});
