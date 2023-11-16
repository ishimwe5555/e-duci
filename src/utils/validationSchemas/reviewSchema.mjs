import Joi from 'joi';
import errorMessage from '../errormessage.mjs';

const ratingEnum = [0, 1, 2, 3, 4, 5];

const ReviewSchema = Joi.object().keys({
  feedback: Joi.string().required().messages(errorMessage('Feedback')),
  rating: Joi.number()
    .integer()
    .valid(...ratingEnum)
    .required(),
});

export default ReviewSchema;
