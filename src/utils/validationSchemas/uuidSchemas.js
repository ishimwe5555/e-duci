import Joi from 'joi';
import errorMessage from '../errormessage';

const getProductSchema = Joi.object().keys({
  pid: Joi.string().uuid().messages(errorMessage('uuid')),
});

const deleteProductSchema = Joi.object().keys({
  cid: Joi.string().uuid().messages(errorMessage('uuid')),
  pid: Joi.string().uuid().messages(errorMessage('uuid')),
});

const collectionIdSchema = Joi.object().keys({
  cid: Joi.string().uuid().messages(errorMessage('uuid')),
});

const updatecartSchema = Joi.object().keys({
  pid: Joi.string().uuid().messages(errorMessage('uuid')),
});

export default {
  getProductSchema,
  deleteProductSchema,
  updatecartSchema,
  collectionIdSchema,
};
