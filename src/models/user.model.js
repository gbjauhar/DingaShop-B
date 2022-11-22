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
    .dataUri(),

});

export default userSchema;
