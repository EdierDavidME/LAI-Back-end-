const Joi = require("joi");

module.exports = {
  findWordSchema: Joi.object({
    find: Joi.string().max(30),
  }),
};
