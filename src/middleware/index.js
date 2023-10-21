import isAuthenticated from './authentication/authentication';
import {
  userEmailExists,
  userUsernameExists,
} from './authentication/userExists';
import validate from './validation/validation';
// import {
//   isCollectionExists,
//   isValidCollection,
// } from './product/collectionExists';
import checkPermission from './checkPermission.middleware';
import errorHandler from './errorhandler.middleware';
import validateParams from './validation/paramValidation';
import isProductSeller from './product/productExists';
import checkProductInStock from './product/checkProductInStock.middleware';
// import checkShippingAddressExist from './product/checkShippingAddressExists.middleware';
// import checkOrderExists from './order/checkOrderExists';
import madePayment from './order/paymentMade';
import checkImg from './product/imageExists';

export {
  isAuthenticated,
  userEmailExists,
  userUsernameExists,
  validate,
  // isCollectionExists,
  // isValidCollection,
  checkPermission,
  errorHandler,
  validateParams,
  isProductSeller,
  checkProductInStock,
  madePayment,
  checkImg,
};
