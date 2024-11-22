import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { isAdmin, getAllCourses, addCourse, updateCourse, deleteCourse } from '../controllers/admin.controller.js';

const router = express.Router();

router.use(authenticateToken); // Apply authentication middleware
router.use(isAdmin); // Apply admin check middleware

router.get('/courses', getAllCourses);
router.post('/courses', addCourse);
router.put('/courses/:courseId', updateCourse);
router.delete('/courses/:courseId', deleteCourse);

export default router;

