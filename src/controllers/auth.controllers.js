import bcrypt from 'bcrypt';
import { usersCollection } from '../database/index.js';
// import { v4 as uuid } from 'uuid';

export default async function registerClient(req, res) {
  const { user } = res.locals;
  console.log(user);

  try {
    const hashPassword = bcrypt.hashSync(user.password, 10);

    await usersCollection.insertOne({ ...user, password: hashPassword });

    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
}
