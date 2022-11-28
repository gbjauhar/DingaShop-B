import express from 'express';
import { createProduct, getCatalog, getProduct } from '../controllers/product.controllers.js';
import validateToken from '../middlewares/auth.middlewares.js';
import { productsValidation, validateGetProduct } from '../middlewares/products.middlewares.js';

const router = express.Router();

router.get('/products', getCatalog);

router.get('/product/:id', validateGetProduct, getProduct);

router.post('/create', validateToken, productsValidation, createProduct);

export default router;
