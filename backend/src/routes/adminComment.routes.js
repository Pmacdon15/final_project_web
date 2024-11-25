import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/isAdmin.middleware.js';
import { getAllComments } from '../controllers/admin.comment.controller.js';


const router = express.Router();

// Apply token authentication middleware first
router.use(authenticateToken);

// Apply admin check middleware to all admin routes
router.use(isAdmin);

// Admin-specific CRUD operations
router.get('/comments', getAllComments);


export default router;