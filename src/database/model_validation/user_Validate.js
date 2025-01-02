import Joi from 'joi';

const userjoi = Joi.object({
    username: Joi.string().min(3).max(30).required()
    .messages({
      'string.empty': 'Username is required',
      'string.min': 'Username must be at least 3 characters',
      'string.max': 'Username cannot exceed 30 characters',
    }),
  email: Joi.string().email().required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Email must be a valid email address',
    }),
  password: Joi.string().min(6).max(50).required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters',
      'string.max': 'Password cannot exceed 50 characters',
    }),
  roleIds: Joi.array().items(Joi.number().integer().positive()).required()
    .messages({
      'array.base': 'Role IDs must be an array of numbers',
      'array.includes': 'Each role ID must be a positive integer',
    }),
  userStore: Joi.array().items(Joi.number().integer().positive())
  .messages({
    'array.base': 'Role IDs must be an array of numbers',
    'array.includes': 'Each role ID must be a positive integer',
  }),
})
export { userjoi };
