// src/routes/auth.routes.js
import express from 'express';
import { login, register } from '../controllers/auth.controller.js';

const router = express.Router();

// POST /api/v1/auth/login
router.post('/auth/login', login);
// POST /api/v1/auth/register
router.post('/auth/register', register);

export default router;
