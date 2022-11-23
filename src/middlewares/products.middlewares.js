import productSchema from '../models/product.model.js';

export default function productsValidation(req, res, next) {
  const {
    name, image, cost, category, description, review, details, comments,
  } = req.body;
  const { user } = res.locals;

  const product = {
    user: user._id,
    name,
    image,
    cost,
    category,
    description,
    review,
    details,
    comments,
  };

  const { error } = productSchema.validate(product, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  res.locals.product = product;

  return next();
}
