import { checkoutServices } from '../../services';

const checkShippingAddressExist = (req, res, next) => {
  checkoutServices
    .getShippingAddress(req.user.id)
    .then((addres) => {
      req.body.shippingAddressId = addres.id;
      return next();
    })
    .catch((err) => {
      if (err) {
        return res.status(406).json({
          code: 406,
          message: 'Please add shipping address',
        });
      }
    });
};

export default checkShippingAddressExist;
