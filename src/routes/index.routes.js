import express from 'express';

import { registerClient, loginClient } from '../controllers/users.controllers.js';
import { exitSession, updateSession } from '../controllers/session.controller.js';
import { getCatalog, createProduct } from '../controllers/product.controllers.js';

import validateToken from '../middlewares/auth.middlewares.js';
import { validateBodyRegister, validateLogin, validateNewRegister } from '../middlewares/user.middlewares.js';
import productsValidation from '../middlewares/products.middlewares.js';

const routes = express.Router();

// public routes

const validateRegister = [validateBodyRegister, validateNewRegister];

routes.post('/sign-up', validateRegister, registerClient);

routes.post('/sign-in', validateLogin, loginClient);

routes.get('/products', getCatalog);

routes.post('/create', productsValidation, createProduct);

// private routes

routes.use(validateToken);

routes.delete('/session', exitSession);

routes.put('/session', updateSession);

export default routes;
