import jwt from 'jsonwebtoken';

function generateToken(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
}
function generateForgetPasswordToken(payload) {
  const token = jwt.sign(payload, process.env.RESET_PASSWORD_KEY, {
    expiresIn: '15m',
  });
  return token;
}
function decodeToken(token) {
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  return verify;
}
function decodeResetPasswordToken(token) {
  const verify = jwt.verify(token, process.env.RESET_PASSWORD_KEY);
  return verify;
}

export {
  generateToken,
  generateForgetPasswordToken,
  decodeToken,
  decodeResetPasswordToken,
};
