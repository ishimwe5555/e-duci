import { userServices } from '../services';

const tfaEnableDisable = async (req, res) => {
  const { user } = req;
  if (!user.tfa_enabled) {
    userServices.enableOtp(user.id);
    return res.status(200).json({
      code: 200,
      message: `OTP option enabled successfully`,
    });
  }
  userServices.disableOtp(user.id);
  return res.status(200).json({
    code: 200,
    message: `OTP option disabled successfully`,
  });
};

export default tfaEnableDisable;
