import isAuthenticated from './authentication/authentication.js';
import {
  userEmailExists,
  userUsernameExists,
} from './authentication/userExists.mjs';
import validate from './validation/validation.js';
// import {
//   isCollectionExists,
//   isValidCollection,
// } from './product/collectionExists.js';
import checkPermission from './checkPermission.middleware.js';
import errorHandler from './errorhandler.middleware.js';
import validateParams from './validation/paramValidation.js';
import isProductSeller from './product/productExists.js';
import checkProductInStock from './product/checkProductInStock.middleware.js';
// import checkShippingAddressExist from './product/checkShippingAddressExists.middleware.js';
// import checkOrderExists from './order/checkOrderExists.js';
import madePayment from './order/paymentMade.js';
import checkImg from './product/imageExists.js';

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
