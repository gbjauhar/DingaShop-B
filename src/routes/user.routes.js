import express from 'express';
import validateToken from '../middlewares/auth.middlewares.js';
import {
  addProductToCart,
  getUser,
  getUserCart,
  loginClient,
  registerClient,
  removeProductToCart,
} from '../controllers/users.controllers.js';
import {
  getHistoricPurchaseUser,
  validateAddToCart,
  validateBodyRegister,
  validateLogin,
  validateNewRegister,
  validateRemoveToCart,
} from '../middlewares/user.middlewares.js';

const router = express.Router();

const validateRegister = [validateBodyRegister, validateNewRegister];

router.post('/sign-up', validateRegister, registerClient);

router.post('/sign-in', validateLogin, loginClient);

router.use(validateToken);

router.delete('/cart/:id', validateRemoveToCart, removeProductToCart);

router.put('/cart/:id', validateAddToCart, addProductToCart);

router.get('/cart', getUserCart);

router.get('/user', getHistoricPurchaseUser, getUser);

export default router;
