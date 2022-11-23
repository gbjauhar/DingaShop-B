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

export async function validateUser(req, res, next) {
  const { user } = res.locals;
}
