import { productsCollection } from '../database/index.js';

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
