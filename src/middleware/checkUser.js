import { userServices } from '../services';

const checkUser = async (req, res, next) => {
  const { email } = req.body;
  const findUser = await userServices.getUserByEmail(email);
  if (findUser) {
    req.user = findUser;
    return next();
  }
  req.user = null;
  return next();
};

export default checkUser;
