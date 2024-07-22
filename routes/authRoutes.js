import express from 'express';
import { register, login, profile } from '../controllers/authController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.route('/profile')
    .get(authenticateToken, profile);

export default router;
