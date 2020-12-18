const Joi = require("joi");
const loginValidate = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(64).required(),
});
const registerValidate = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(64).required(),
});
module.exports = { registerValidate, loginValidate };
