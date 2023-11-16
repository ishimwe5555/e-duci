import Joi from 'joi';
import errorMessage from '../errormessage.mjs';

const addPaymentSchema = Joi.object().keys({
  cardNumber: Joi.number().required().messages(errorMessage('cardNumber')),
  expMonth: Joi.number()
    .min(1)
    .max(12)
    .required()
    .messages(errorMessage('expMonth')),
  expYear: Joi.number().required().messages(errorMessage('expYear')),
  cvc: Joi.number().required().messages(errorMessage('cvc')),
});

export default addPaymentSchema;
