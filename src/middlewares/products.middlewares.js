import { ObjectId } from 'mongodb';
import productSchema from '../models/product.model.js';
import { productsCollection } from '../database/index.js';
import { NO_PRODUCT_FOUND } from '../constants/messages.constants.js';

export function productsValidation(req, res, next) {
  const { body: product } = req;

  const { error } = productSchema.validate(product, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  res.locals.product = product;

  return next();
}

export async function validateGetProduct(req, res, next) {
  const { id } = req.params;
  try {
    const existingProduct = await productsCollection.find({ _id: ObjectId(id) }).toArray();
    if (existingProduct.length < 1) return res.status(404).send({ error: NO_PRODUCT_FOUND });

    res.locals.id = id;
  } catch (err) {
    return res.status(500).send({ error: err });
  }

  return next();
}
