import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { EXISTING_USER, INCORRECT_AUTH } from '../constants/messages.constants.js';
import { productsCollection, usersCollection } from '../database/index.js';
import userSchema from '../models/user.model.js';

export async function validateBodyRegister(req, res, next) {
  const { body } = req;

  try {
    const { error } = userSchema.validate(body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(401).send({ error: errors });
    }
    res.locals.user = body;
  } catch (err) {
    return res.sendStatus(500);
  }

  return next();
}

export async function validateNewRegister(req, res, next) {
  const { user } = res.locals;

  try {
    const existingUser = await usersCollection.findOne({ email: user.email });
    if (existingUser) return res.status(401).send({ message: EXISTING_USER });
  } catch (err) {
    return res.sendStatus(500);
  }

  return next();
}

export async function validateLogin(req, res, next) {
  const { email, password } = req.body;

  try {
    const existingUser = await usersCollection.findOne({ email });
    if (!existingUser) return res.status(400).send({ error: INCORRECT_AUTH });

    const correctPassword = await bcrypt.compare(password, existingUser.password);
    if (!correctPassword) return res.status(401).json({ error: INCORRECT_AUTH });

    res.locals.user = existingUser;
  } catch (err) {
    return res.sendStatus(500);
  }

  return next();
}

export async function validateAddToCart(req, res, next) {
  const { id } = req.params;
  try {
    const existingProduct = await productsCollection.findOne({
      _id: ObjectId(id),
    });
    if (!existingProduct) return res.sendStatus(404);

    res.locals.id = id;
  } catch (err) {
    return res.status(500).send({ error: err });
  }
  return next();
}

export async function validateRemoveToCart(req, res, next) {
  const { id } = req.params;
  try {
    const existingInCart = await usersCollection.findOne({
      'cart._id': id,
    });
    if (!existingInCart) return res.sendStatus(404);

    res.locals.id = id;
  } catch (err) {
    return res.status(500).send({ error: err });
  }
  return next();
}
