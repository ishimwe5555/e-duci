import Joi from 'joi';
import errorMessage from '../errormessage';

const statusEnum = [
  'pending',
  'confirmed',
  'incomplete',
  'succeeded',
  'failed',
];

const orderStatusSchema = Joi.object().keys({
  status: Joi.string()
    .valid(...statusEnum)
    .required()
    .messages(errorMessage('status')),
});

export default orderStatusSchema;
