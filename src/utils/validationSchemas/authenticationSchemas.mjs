import Joi from 'joi';
import errorMessage from '../errormessage.mjs';

const usernameSchema = Joi.string()
  .min(6)
  .max(30)
  .required()
  .messages(errorMessage('Username'));

const emailSchema = Joi.string()
  .email()
  .required()
  .messages(errorMessage('Email'));

const passwordSchema = Joi.string()
  .required()
  .pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0123456789])(?=.*[@$!%*?&])[A-Za-z0123456789@$!%*?&]{8,}$/
  )
  .messages(errorMessage('Password'));

const LoginSchema = Joi.object().keys({
  email: emailSchema,
  password: passwordSchema,
});

const SignUpSchema = Joi.object().keys({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

const CollectionNameSchema = Joi.object().keys({
  name: Joi.string().required().messages(errorMessage('Collection Name')),
});

const PasswordSchema = Joi.object().keys({
  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0123456789])(?=.*[@$!%*?&])[A-Za-z0123456789@$!%*?&]{8,}$/
    )
    .messages(errorMessage('Password')), // password has both numbers and letters and is btn 6 and 30
});

const newPasswordSchema = Joi.object().keys({
  oldPassword: passwordSchema,
  newPassword: passwordSchema
    .invalid(Joi.ref('oldPassword'))
    .messages(errorMessage('Password')),
});

export {
  LoginSchema,
  SignUpSchema,
  PasswordSchema,
  newPasswordSchema,
  CollectionNameSchema,
};
