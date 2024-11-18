import express from 'express';
import { getAllCourses, removeUserCourse } from '../controllers/courses.controller.js';
const router = express.Router();

router.get('/get-all-courses', getAllCourses);
router.delete('/remove-user-course/userId/:userId/courseId/:courseId', removeUserCourse);

export default router;

