const Joi = require("joi");

module.exports = {
  createUserSchema: Joi.object({
    username: Joi.string().alphanum().min(4).max(30).required(),
    email: Joi.string().required().min(10).max(150),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    repeat_password: Joi.ref("password"),
  }),
  updateUserSchema: Joi.object({
    currentName: Joi.string().alphanum().min(4).max(30).required(),
    newName: Joi.string().alphanum().min(4).max(30).required(),
    password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    token: [Joi.string(), Joi.number(), Joi.required()],
  }),
  loginUserSchema: Joi.object({
    username: Joi.string().alphanum().min(4).max(30).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  }),
};

//https://joi.dev/api/?v=17.4.0