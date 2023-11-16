// import isAuthenticated from './authentication/authentication.js';
// import {
//   userEmailExists,
//   userUsernameExists,
// } from './authentication/userExists.mjs';
import validate from './validation/validation.mjs';
// import {
//   isCollectionExists,
//   isValidCollection,
// } from './product/collectionExists.js';
//import checkPermission from './checkPermission.middleware.js';
import errorHandler from './errorhandler.middleware.mjs';
import validateParams from './validation/paramValidation.mjs';
import isProductSeller from './product/productExists.mjs';
import checkProductInStock from './product/checkProductInStock.middleware.mjs';
// import checkShippingAddressExist from './product/checkShippingAddressExists.middleware.js';
// import checkOrderExists from './order/checkOrderExists.js';
//import madePayment from './order/paymentMade.js';
import checkImg from './product/imageExists.mjs';

export {
  //isAuthenticated,
  //userEmailExists,
  //userUsernameExists,
  validate,
  // isCollectionExists,
  // isValidCollection,
  //checkPermission,
  errorHandler,
  validateParams,
  isProductSeller,
  checkProductInStock,
  //madePayment,
  checkImg,
};
