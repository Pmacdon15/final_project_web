import express from 'express';
import {
  getAllCourses,
  addUserCourse,
  removeUserCourse,
  getUserCourses,
  getAllCoursesByProgram,
} from '../controllers/courses.controller.js';

const router = express.Router();

// router.get('/courses', getAllCourses);
router.get('/courses/:programId', getAllCoursesByProgram);
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

