import joi from 'joi';

const productSchema = joi.object({
  name: joi.string()
    .min(3)
    .required(),

  image: joi.string()
    .uri()
    .regex(/^(http(s):\/\/.)[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)$/),

  cost: joi.number()
    .required(),

  category: joi.array()
    .items(
      joi.string()
        .required(),
    )
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
