import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { isAdmin, getAllCourses, addCourse, updateCourse, deleteCourse } from '../controllers/admin.controller.js';

const router = express.Router();

// Apply token authentication middleware first
router.use(authenticateToken);

// Apply admin check middleware to all admin routes
router.use(isAdmin);

// Admin-specific CRUD operations
router.get('/courses', getAllCourses);
router.post('/courses', addCourse);
router.put('/courses/:courseId', updateCourse);
router.delete('/courses/:courseId', deleteCourse);

export default router;
