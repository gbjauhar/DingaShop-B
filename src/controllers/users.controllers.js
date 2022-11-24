import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import { ObjectId } from 'mongodb';
import { sessionsCollection, usersCollection } from '../database/index.js';

export async function registerClient(req, res) {
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

export async function loginClient(req, res) {
  const { user } = res.locals;
  try {
    const token = uuid();
    await sessionsCollection.insertOne({ token, userId: user._id });

    delete user.password;

    return res.status(201).send({ token, user });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

export async function addProductToCart(req, res) {
  const { user } = res.locals;
  const { id } = res.locals;
  try {
    await usersCollection.updateOne(
      { _id: user._id },
      {
        $push: {
          cart: {
            idProduct: ObjectId(id),
            date: dayjs().format('DD/MM/YYYY'),
          },
        },
      },
    );
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send({ error: err });
  }
}
