import joi from 'joi';

const productSchema = joi.object({
  name: joi.string()
    .alphanum()
    .min(3)
    .required(),
  image: joi.string()
    .dataUri()
    .required(),
  cost: joi.string()
    .required(),
  category: joi.string()
    .required(),
  description: joi.string()
    .required(),
  details: joi.object(),
  review: joi.array()
    .min(1)
    .max(1),
  comments: joi.object(),

});

export default productSchema;
