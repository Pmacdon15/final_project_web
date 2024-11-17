import express from 'express';
import { getAllPrograms, addProgram, updateProgram } from '../controllers/programs.controller.js';
const router = express.Router();

router.get('/get-all-programs', getAllPrograms);


router.post('/add-program', addProgram);
router.put('/update-program/id/:id', updateProgram);

export default router;

