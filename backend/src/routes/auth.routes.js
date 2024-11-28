// src/routes/auth.routes.js
import express from 'express';
import {
  login,
  register,
  logout,
  changePassword,
} from '../controllers/auth.controller.js';

const router = express.Router();

// POST /api/v1/auth/login
router.post('/auth/login', login);
// POST /api/v1/auth/register
router.post('/auth/register', register);

// Route for changing password
router.put('/auth/change-password', changePassword);

// Route for logging out (clearing JWT token)
router.post('/auth/logout', logout);

export default router;
