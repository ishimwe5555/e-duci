import errorMessage from './errormessage';
import generateOtp from './generateOtp';
import { hashPassword, comparePassword } from './password'; //eslint-disable-line
import {
  generateToken,
  decodeToken,
  generateForgetPasswordToken,
  decodeResetPasswordToken,
} from './token';
import {
  LoginSchema,
  SignUpSchema,
  PasswordSchema,
  newPasswordSchema,
} from './validationSchemas/authenticationSchemas';
import userProfileSchema from './validationSchemas/userProfileSchema';
import CollectionNameSchema from './validationSchemas/collectionSchemas';
import productSchema from './validationSchemas/productSchema';
// import addproductSchema from './validationSchemas/productSchema';
import uuidSchemas from './validationSchemas/uuidSchemas';
import reviewSchema from './validationSchemas/reviewSchema';
import shippingAddressSchema from './validationSchemas/shippingAddressSchema';
// eslint-disable-next-line import/no-cycle
import notificationUtils from './notificationUtils';
import addPaymentSchema from './validationSchemas/paymentSchema';
import orderStatusSchema from './validationSchemas/orderSchema';

import {
  stripeToken,
  paymentMethod,
  charge,
  stripeListener,
  getStatus,
} from './payment';
import webhookBody from './webhookBody';

export {
  errorMessage,
  hashPassword,
  comparePassword,
  generateToken,
  decodeToken,
  generateForgetPasswordToken,
  decodeResetPasswordToken,
  generateOtp,
  stripeToken,
  paymentMethod,
  charge,
  stripeListener,
  getStatus,
  webhookBody,
  LoginSchema,
  SignUpSchema,
  CollectionNameSchema,
  PasswordSchema,
  newPasswordSchema,
  productSchema,
  uuidSchemas,
  reviewSchema,
  shippingAddressSchema,
  notificationUtils,
  userProfileSchema,
  addPaymentSchema,
  orderStatusSchema,
};
