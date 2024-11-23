import express from 'express';
import { addUserCourse, removeUserCourse,  } from '../controllers/courses.controller.js';
const router = express.Router();

router.post('/add-user-course/userId/:userId/courseId/:courseId/userTermId/:userTermId/termSeason/:termSeason', addUserCourse);
router.delete('/remove-user-course/userId/:userId/courseId/:courseId', removeUserCourse);



export default router;

