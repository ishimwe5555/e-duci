import { generateOtp } from '../utils';

const { assert } = require('chai');

describe('generateOtp', function () {
  it('should generate a 6-digit OTP', function () {
    const otp = generateOtp();
    assert.isNumber(otp, 'OTP should be a number');
    assert.isTrue(
      otp >= 100000 && otp <= 999999,
      'OTP should be a 6-digit number'
    );
  });

  it('should generate a different OTP each time', function () {
    const otp1 = generateOtp();
    const otp2 = generateOtp();
    assert.notEqual(otp1, otp2, 'Generated OTPs should be different');
  });
});
