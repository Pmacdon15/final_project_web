import express from 'express';

import { getAllPrograms, addProgram, updateProgram,removeProgram } from '../controllers/programs.controller.js';
const router = express.Router();

router.get('/get-all-programs', getAllPrograms);
router.post('/add-program', addProgram);
router.delete('/remove-program/:id', removeProgram);
router.put('/update-program/id/:id', updateProgram);

export default router;

