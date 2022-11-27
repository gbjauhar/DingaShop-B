import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import { ObjectId } from 'mongodb';
import { productsCollection, sessionsCollection, usersCollection } from '../database/index.js';

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
            _id: uuid(),
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

export async function removeProductToCart(req, res) {
  const { user } = res.locals;
  const { id } = res.locals;
  try {
    await usersCollection.updateOne(
      { _id: user._id },
      {
        $pull: {
          cart: { _id: id },
        },
      },
    );
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send({ error: err });
  }
}

export async function getUserCart(req, res) {
  const { user } = res.locals;
  const array = [];
  for (let i = 0; i < user.cart.length; i += 1) {
    const product = await productsCollection.findOne({ _id: ObjectId(user.cart[i].idProduct) });
    console.log(product);
    array.push({ ...product, idCart: user.cart[i]._id });
  }

  try {
    res.send(array);
  } catch {
    res.send('Não foi encontrado');
  }
}
