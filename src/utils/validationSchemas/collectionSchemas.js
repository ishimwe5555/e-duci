import Joi from 'joi';
import errorMessage from '../errormessage.mjs';

const CollectionNameSchema = Joi.object().keys({
  name: Joi.string().required().messages(errorMessage('Collection Name')),
});

export default CollectionNameSchema;
