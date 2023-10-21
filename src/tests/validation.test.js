/* eslint-disable mocha/no-setup-in-describe */
import assert from 'assert';
import Joi from 'joi';
import validate from '../middleware/validation/validation';

describe('validate', function () {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required().messages({
      'string.base': 'Username should be a string',
      'string.empty': 'Username is not allowed to be empty',
      'string.min': 'Username length must be at least 3 characters long',
      'string.max':
        'Username length must be less than or equal to 30 characters long',
      'any.required': 'Username is required',
    }),
    email: Joi.string().email().required().messages({
      'string.base': 'Email should be a string',
      'string.empty': 'Email is not allowed to be empty',
      'string.email': 'Email must be a valid email',
      'any.required': 'Email is required',
    }),
    password: Joi.string()
      .min(8)
      .required()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0123456789])(?=.*[@$!%*?&])[A-Za-z0123456789@$!%*?&]{8,}$/
      )
      .messages({
        'string.base': 'Password should be a string',
        'string.empty': 'Password is not allowed to be empty',
        'string.pattern.base':
          'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character (@$!%*?&)',
        'any.required': 'Password is required',
      }),
  });

  it('should call next() if validation passes', function () {
    const req = {
      body: {
        username: 'john',
        email: 'john@example.com',
        password: 'Passw0rd!',
      },
    };
    const res = {};
    const next = () => {};

    validate(schema)(req, res, next);

    assert.strictEqual(res.status, undefined);
  });

  it('should return a 406 error if validation fails', function () {
    const req = {
      body: {
        username: '',
        email: 'johnexample.com',
        password: 'invalidpassword',
      },
    };
    const res = {
      status: (statusCode) => {
        res.status = statusCode;
        return res;
      },
      send: (data) => {
        res.body = data;
        return res;
      },
    };
    const next = () => {};

    validate(schema)(req, res, next);

    assert.strictEqual(res.status, 406);
  });
});
