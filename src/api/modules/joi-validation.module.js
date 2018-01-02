import Joi from 'joi';

import { createClientResponse } from './helpers/helpers';

export const validateBody = schema => (req, res, next) => {
  const result = Joi.validate(req.body, schema);

  if (result.error) {
    const validationErrors = [];
    result.error.details.forEach((err) => {
      validationErrors.push(err.message);
    });

    res.status(400);
    res.json(createClientResponse(null, validationErrors));
  } else {
    next();
  }
};

/*
* All validation schemas goes here
* */
export const schemas = {
  registrationSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    username: Joi.string().optional()
  }),
  loginSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
};
