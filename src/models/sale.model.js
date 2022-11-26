import Joi from 'joi';

const purchaseSchema = Joi.object({
  idUser: Joi.object()
    .required(),

  products: Joi.array()
    .items(Joi.required())
    .required(),

  payment: Joi.string()
    .valid('credit-card', 'debit-card', 'bank-slip')
    .required(),

  value: Joi.number()
    .required(),
});

export default purchaseSchema;
