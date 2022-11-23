import express from 'express';
import { exitSession, updateSession } from '../controllers/session.controller.js';
import { registerClient, loginClient } from '../controllers/users.controllers.js';
import validateToken from '../middlewares/auth.middlewares.js';
import { validateBodyRegister, validateLogin, validateNewRegister } from '../middlewares/user.middlewares.js';

const routes = express.Router();

// public routes

const validateRegister = [validateBodyRegister, validateNewRegister];

routes.post('/sign-up', validateRegister, registerClient);

routes.post('/sign-in', validateLogin, loginClient);

// private routes

routes.use(validateToken);

routes.delete('/session', exitSession);

routes.put('/session', updateSession);

export default routes;
