const checkPermission = (role) => (req, res, next) => {
  if (req.user.role === role) {
    return next();
  }
  return res.status(401).json({ code: 401, message: 'Unauthorized' });
};

export default checkPermission;
