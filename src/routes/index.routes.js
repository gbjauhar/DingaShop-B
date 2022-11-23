import express from 'express';
import { registerClient, loginClient } from '../controllers/auth.controllers.js';
import { validateBodyRegister, validateLogin, validateNewRegister } from '../middlewares/user.middlewares.js';

const routes = express.Router();

// auth routes

const validateRegister = [validateBodyRegister, validateNewRegister];

routes.post('/sign-up', validateRegister, registerClient);

routes.post('/sign-in', validateLogin, loginClient);

export default routes;
