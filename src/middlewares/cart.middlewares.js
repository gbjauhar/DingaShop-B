import productSchema from '../models/product.model.js';

export default function cartValidation(req, res, next) {
  const { idUser, idProduct, payment } = req.body;
  const { user } = res.locals;

  const product = {
    idUser,
    idProduct,
    payment,
  };

  const { error } = productSchema.validate(product, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  res.locals.product = product;

  return next();
}
