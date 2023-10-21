// eslint-disable-next-line import/no-cycle
import { redisClient, sendEmailReset } from '../helpers';
import { generateOtp, generateToken } from '../utils';

async function twoFactorAuth(res, user) {
  const body = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
  const token = generateToken(body);
  const otp = generateOtp();
  redisClient.setEx(user.email, 300, `${otp}=${token}`).then(async () => {
    const mailOptions = {
      to: user.email,
      subject: 'verification code',
      html: `Your verification code is: ${otp}`,
    };
    await sendEmailReset(mailOptions);
  });

  return res.status(200).json({
    code: 200,
    message: 'Code has been sent to your email',
  });
}

export default twoFactorAuth;
