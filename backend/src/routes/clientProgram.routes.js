import express from 'express';

import { getUserProgram } from '../controllers/programs.controller.js';

const router = express.Router();

router.get('/programs/:username', getUserProgram);

export default router;
