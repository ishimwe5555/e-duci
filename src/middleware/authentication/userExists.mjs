import { userServices } from '../../services/index.mjs';

const userEmailExists = async (req, res, next) => {
  const user = await userServices.getUserByEmail(req.body.email);
  if (!user) {
    return next();
  }
  return res.status(409).json({ code: 409, message: 'Email Exists.' });
};

const userUsernameExists = async (req, res, next) => {
  const user = await userServices.getUserByUsername(req.body.username);
  if (!user) {
    return next();
  }
  return res.status(409).json({ code: 409, message: 'Username Exists.' });
};

export { userEmailExists, userUsernameExists };
