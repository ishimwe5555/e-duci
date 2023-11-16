import Joi from 'joi';
import errorMessage from '../errormessage.mjs';

const shippingAddressSchema = Joi.object().keys({
  firstName: Joi.string().required().messages(errorMessage('firstName')),
  lastName: Joi.string().required().messages(errorMessage('lastName')),
  phoneNumber: Joi.string().required().messages(errorMessage('phoneNumber')),
  streetAddress: Joi.string()
    .required()
    .messages(errorMessage('streetAddress')),
  country: Joi.string().required().messages(errorMessage('country')),
  city: Joi.string().required().messages(errorMessage('city')),
  postalCode: Joi.string().required().messages(errorMessage('postalCode')),
});

export default shippingAddressSchema;
