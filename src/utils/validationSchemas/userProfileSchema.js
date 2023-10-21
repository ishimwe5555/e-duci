import Joi from 'joi';
import errorMessage from '../errormessage';

const userProfileSchema = Joi.object().keys({
  names: Joi.string().max(255).allow('').messages(errorMessage('Names')),
  gender: Joi.string()
    .valid('male', 'female', 'other')
    .allow('')
    .messages(errorMessage('Gender')),
  birthdate: Joi.date()
    .max('now')
    .allow('')
    .messages(errorMessage('BirthDate')),
  language: Joi.string().allow('').messages(errorMessage('Language')),
  city: Joi.string().max(255).allow('').messages(errorMessage('City')),
  street: Joi.string().max(255).allow('').messages(errorMessage('Street')),
  currency: Joi.string().messages(errorMessage('Currency')),
  postalCode: Joi.string()
    .max(10)
    .allow('')
    .messages(errorMessage('Postal code')),
  country: Joi.string().max(255).allow('').messages(errorMessage('Country')),
  accountNumber: Joi.string()
    .allow('')
    .messages(errorMessage('Account Number')),
  accountName: Joi.string()
    .max(255)
    .allow('')
    .messages(errorMessage('Account Name')),
  telephone: Joi.string()
    .pattern(/^(\+?\d{1,3}[- ]?)?\d{1,14}$/)
    .allow('')
    .messages(errorMessage('Telephone')),
});

export default userProfileSchema;
