const validateRole = (req, res, next) => {
  if (
    req.body.role === 'ADMIN' ||
    req.body.role === 'BUYER' ||
    req.body.role === 'SELLER'
  ) {
    return next();
  }
  return res.status(400).json({ Message: 'Invalid role' });
};

export default validateRole;
