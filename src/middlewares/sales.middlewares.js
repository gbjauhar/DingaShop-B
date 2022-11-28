import { usersCollection } from '../database/index.js';
import purchaseSchema from '../models/sale.model.js';

export default async function validatePurchase(req, res, next) {
  const { user } = res.locals;
  const { products, payment, value } = req.body;

  try {
    const purchase = {
      idUser: user._id, products, payment, value,
    };
    const { error } = purchaseSchema.validate(purchase, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
    }
    const moreThenOneProductPurchase = products.length > 1;

    if (moreThenOneProductPurchase) {
      const modify = { $set: { cart: [] } };

      await usersCollection.updateOne({ _id: user._id }, modify);
    } else {
      const newCart = user.cart.filter((item) => {
        if (item._id === products[0].idCart) {
          return false;
        }
        return true;
      });
      const modify = { $set: { cart: newCart } };

      await usersCollection.updateOne({ _id: user._id }, modify);
    }

    res.locals.purchase = purchase;
  } catch (err) {
    return res.status(500).send({ error: err });
  }
  return next();
}
