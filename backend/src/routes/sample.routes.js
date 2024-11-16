// ! This is a sample file so the directory would upload with my commit  and  so we can see what a route should look like

import express from 'express';
import { getSampleData } from '../controllers/sample.controller.js';
const router = express.Router();

router.get('/sample-data', getSampleData);

export default router;

