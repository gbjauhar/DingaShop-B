import express from 'express';
import { exitSession, updateSession } from '../controllers/session.controller.js';
import validateToken from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.use(validateToken);

router.delete('/session', exitSession);

router.put('/session', updateSession);

export default router;
