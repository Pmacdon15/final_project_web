import express from 'express';
import {
  addUserCourse,
  removeUserCourse,
  getUserCourses,
} from '../controllers/courses.controller.js';
import { getAllCourses } from '../controllers/courses.controller.js';

const router = express.Router();

router.get('/courses',getAllCourses)
router.post(
  '/courses/userId/:userId/courseId/:courseId/userTermId/:userTermId/termSeason/:termSeason',
  addUserCourse
);
router.delete('/courses/userId/:userId/courseId/:courseId', removeUserCourse);
router.get('/courses/userId/:userId', getUserCourses);

export default router;
