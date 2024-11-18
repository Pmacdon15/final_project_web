import express from 'express';
import { getAllCourses, addUserCourse, removeUserCourse, removeCourse } from '../controllers/courses.controller.js';
const router = express.Router();

router.get('/get-all-courses', getAllCourses);
router.post('/add-user-course/userId/:userId/courseId/:courseId/userTermId/:userTermId/termSeason/:termSeason', addUserCourse);
router.delete('/remove-course/courseId/:courseId', removeCourse);
router.get('/remove-user-course/userId/:userId/courseId/:courseId', removeUserCourse);
router.delete('/remove-user-course/userId/:userId/courseId/:courseId', removeUserCourse);



export default router;

