import express from 'express';
import registerClient from '../controllers/auth.controllers.js';
import { validateBodyRegister, validateNewRegister } from '../middlewares/auth.middlewares.js';

const routes = express.Router();

// auth routes

const validateRegister = [validateBodyRegister, validateNewRegister];

routes.post('/sign-up', validateRegister, registerClient);

export default routes;
