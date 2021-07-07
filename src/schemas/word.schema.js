const Joi = require("joi");

module.exports = {
  findWordSchema: Joi.object({
    find: Joi.string().max(30),
  }),
  createNewWordSchema: Joi.object({
    _id: Joi.string().alphanum().min(0).allow(""),
    _word: [Joi.string().min(1).max(100).required()],
    mean: [Joi.string().min(1).max(100).required()],
    espanol: [Joi.string().min(1).max(100).required()],
    significado: [Joi.string().min(1).max(100).required()],
    link_get: [Joi.string().min(10)],
    image_get: [Joi.string().min(15)],
  }),
  updateNewWordSchema: Joi.object({
    _id: Joi.string().alphanum().min(24).max(24).required(),
    _word: [Joi.string().min(1).max(100).required()],
    mean: [Joi.string().min(1).max(100).required()],
    espanol: [Joi.string().min(1).max(100).required()],
    significado: [Joi.string().min(1).max(100).required()],
    link_get: [Joi.string().min(10)],
    image_get: [Joi.string().min(15)],
  }),
};
