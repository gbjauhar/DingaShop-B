import { EXISTING_USER } from '../constants/messages.constants.js';
import { usersCollection } from '../database/index.js';
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
