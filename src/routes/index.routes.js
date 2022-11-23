import express from 'express';

import { registerClient, loginClient } from '../controllers/auth.controllers.js';
import { exitSession, updateSession } from '../controllers/session.controller.js';
import getCatalog from '../controllers/product.controllers.js';

import validateToken from '../middlewares/auth.middlewares.js';
import { validateBodyRegister, validateLogin, validateNewRegister } from '../middlewares/user.middlewares.js';

const routes = express.Router();

// public routes

const validateRegister = [validateBodyRegister, validateNewRegister];

routes.post('/sign-up', validateRegister, registerClient);

routes.post('/sign-in', validateLogin, loginClient);

routes.get('/products', getCatalog);

// private routes

routes.use(validateToken);

routes.delete('/session', exitSession);

routes.put('/session', updateSession);

export default routes;
