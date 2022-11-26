import { salesCollection } from '../database/index.js';

export default async function finalizePurchase(req, res) {
  const { purchase } = res.locals;

  try {
    await salesCollection.insertOne({ purchase });

    return res.status(201).send({ message: 'Purchase made.' });
  } catch (err) {
    return res.status(500).send({ error: err });
  }
}
