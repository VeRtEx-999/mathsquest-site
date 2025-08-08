import express from 'express';
import { loginUser } from '../auth/login.js';
import { validateRegistration, registerUser } from '../auth/register.js';

const router = express.Router();

// Login route
router.post('/login', loginUser);

// Registration route
router.post('/register', validateRegistration, registerUser);

export default router;