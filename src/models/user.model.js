import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),

  password: Joi.string()
    .min(6)
    .required(),

  cpf: Joi.string()
    .alphanum()
    .regex(/^\d{3}.\d{3}.\d{3}-\d{2}$/),

  photo: Joi.string()
    .uri()
    .regex(/^(http(s):\/\/.)[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)$/),

  cart: Joi.array()
    .items(
      Joi.object({
        idProduct: Joi.string()
          .required(),

        date: Joi.string()
          .required(),
      }),
    ),
});

export default userSchema;
