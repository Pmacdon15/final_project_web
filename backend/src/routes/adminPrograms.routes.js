import express from 'express';
import { getAllPrograms, addProgram, updateProgram,removeProgram } from '../controllers/programs.controller.js';

const router = express.Router();

router.get('/programs', getAllPrograms);
router.post('/programs', addProgram);
router.delete('/programs/:id', removeProgram);
router.put('/programs/:id', updateProgram);

export default router;

