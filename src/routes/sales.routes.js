import express from 'express';
import finalizePurchase from '../controllers/sales.controller.js';
import validateToken from '../middlewares/auth.middlewares.js';
import validatePurchase from '../middlewares/sales.middlewares.js';

const router = express.Router();

router.use(validateToken);

router.post('/purchase', validatePurchase, finalizePurchase);

export default router;
