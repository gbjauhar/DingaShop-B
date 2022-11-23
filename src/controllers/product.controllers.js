import { productsCollection } from '../database/index.js';

export default async function getCatalog(req, res) {
  try {
    const catalog = await productsCollection.find({}).toArray();

    return res.status(200).send({ catalog });
  } catch (err) {
    return res.status(500).send({ error: err });
  }
}
