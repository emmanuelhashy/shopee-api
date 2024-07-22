import express from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(authenticateToken, createProduct)
  .get(getProducts);

router.route('/:id')
  .get(getProductById)
  .put(authenticateToken, updateProduct)
  .delete(authenticateToken, deleteProduct);

export default router;
