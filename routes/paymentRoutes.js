import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { config, paymentIntent } from '../controllers/paymentController.js';

const router = express.Router();

router.route('/create-payment-intent')
  .post(authenticateToken, paymentIntent)

router.route('/config')
  .get(authenticateToken, config);
  
export default router;