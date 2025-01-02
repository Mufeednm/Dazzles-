import Joi from 'joi';

const customerjoi = Joi.object({
  customerName: Joi.string().min(3).required(),
  customerEmail: Joi.string().email().required(),
  customerMobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({ 'string.pattern.base': 'Mobile number must be 10 digits long.' }),
  customerAddress: Joi.string().min(10).required(),
  customerMembership: Joi.string().valid('Platinum', 'Silver').required(),
});

export { customerjoi };
