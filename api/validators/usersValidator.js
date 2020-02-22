const Joi = require('joi');

const usersSchema = {
  body: {
    name: Joi.string().trim().min(1).max(100).required(),
    gender: Joi.string().required(),
    age: Joi.number().integer().min(0).max(150).required(),
    country: Joi.string().optional(),
    id: Joi.string().optional()
  },
  params: {
    id: Joi.string().optional()
  }
};

module.exports = usersSchema;