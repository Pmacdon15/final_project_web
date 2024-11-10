// ! This is a sample file so the directory would upload with my commit  and  so we can see what a route should look like

import express from 'express';
import { getAllPrograms } from '../controllers/programs.controller.js';
const router = express.Router();

router.get('/get-all-programs', getAllPrograms);

export default router;

