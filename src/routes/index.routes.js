import express from 'express';
import registerClient from '../controllers/auth.controllers.js';
import validateBodyRegister from '../middlewares/auth.middlewares.js';

const routes = express.Router();

// auth routes

routes.post('/sign-up', validateBodyRegister, registerClient);

export default routes;
