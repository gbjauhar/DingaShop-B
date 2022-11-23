import { sessionsCollection } from '../database/index.js';

export default async function exitSession(req, res) {
  const { user } = res.locals;

  try {
    await sessionsCollection.deleteOne({ userId: user._id });

    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
