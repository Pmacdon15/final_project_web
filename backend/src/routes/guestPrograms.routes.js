import express from 'express';
import { getAllPrograms, getProgramById } from '../controllers/programs.controller.js';

const router = express.Router();

router.get('/programs', getAllPrograms);
router.get('/programs/:id', getProgramById);

export default router;