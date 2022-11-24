import { ObjectId } from 'mongodb';
import { productsCollection, salesCollection } from '../database/index.js';

export async function getCatalog(req, res) {
  try {
    const catalog = await productsCollection.find({}).toArray();

    return res.status(200).send({ catalog });
  } catch (err) {
    return res.status(500).send({ error: err });
  }
}

export async function createProduct(req, res) {
  const { product } = res.locals;
  console.log(product);
  try {
    await productsCollection.insertOne({ product });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function addToCart(req, res) {
  const { idUser, idProduct, payment } = req.body;
  try {
    const add = await salesCollection.insertOne({ idUser, idProduct, payment });
    res.sendStatus(add);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}

export async function deleteFromCart(req, res) {
  const { idCart } = req.body;
  try {
    await salesCollection.deleteOne({ _id: ObjectId(idCart) });
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}
