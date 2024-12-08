import express from 'express';

import { getAllCourses } from '../controllers/courses.controller.js';

const router = express.Router();

router.get('/courses', getAllCourses);

export default router;
