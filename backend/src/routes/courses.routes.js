import express from 'express';
import { getAllCourses, addUserCourse, removeUserCourse } from '../controllers/courses.controller.js';
const router = express.Router();

router.get('/get-all-courses', getAllCourses);
router.post('/add-user-course/userId/:userId/courseId/:courseId/userTermId/:userTermId/termSeason/:termSeason', addUserCourse);
router.get('/remove-user-course/userId/:userId/courseId/:courseId', removeUserCourse);

export default router;

