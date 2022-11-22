import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

const usersCollection = '';

export default async function registerClient(req, res) {
  const { name, email, password } = req.body;

  try {
    const hashPassword = bcrypt.hashSync(password, 10);

    await usersCollection.insertOne({});
  } catch (err) {

  }
}
