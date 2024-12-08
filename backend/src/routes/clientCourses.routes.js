import express from 'express';
import {
  addUserCourse,
  removeUserCourse,
  getUserCourses,
} from '../controllers/courses.controller.js';

const router = express.Router();

router.post(
  '/courses/username/:username/courseId/:courseId/userTermId/:userTermId/termSeason/:termSeason',
  addUserCourse
);
router.delete(
  '/courses/username/:username/courseId/:courseId',
  removeUserCourse
);
router.get('/courses/username/:username', getUserCourses);

export default router;
