import express from 'express';
import { login, register, logout, me } from '../controllers/authController';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.get('/me', me);

export default router;
