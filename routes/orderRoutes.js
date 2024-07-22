import express from 'express';
import { createOrder, getOrders, getOrderById } from '../controllers/orderController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(authenticateToken, createOrder)
  .get(authenticateToken, getOrders);

router.route('/:id')
  .get(authenticateToken, getOrderById)

export default router;
