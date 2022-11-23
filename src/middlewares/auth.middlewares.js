import { usersCollection, sessionsCollection } from '../database/index.js';
import { NO_USER_FOUND, USER_NOT_LOGGED } from '../constants/messages.constants.js';

export default async function validateToken(req, res, next) {
  const { authorization } = req.headers;

  try {
    const token = authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).send({ error: USER_NOT_LOGGED });

    const session = await sessionsCollection.findOne({ token });
    if (!session) return res.status(401).json({ error: USER_NOT_LOGGED });

    const user = await usersCollection.findOne({ _id: session.userId });
    if (!user) return res.status(401).json({ error: NO_USER_FOUND });

    req.user = user;
  } catch (err) {
    return res.status(500).send({ error: err });
  }

  return next();
}
