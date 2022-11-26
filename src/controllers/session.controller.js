import { v4 as uuid } from 'uuid';
import { sessionsCollection } from '../database/index.js';

export async function exitSession(req, res) {
  const { user } = res.locals;

  try {
    await sessionsCollection.deleteOne({ userId: user._id });

    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

export async function updateSession(req, res) {
  const { user } = res.locals;

  try {
    const newToken = uuid();

    await sessionsCollection.updateOne({
      userId: user._id,
    }, { $set: { token: newToken } });

    return res.status(200).send({ token: newToken, user });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
