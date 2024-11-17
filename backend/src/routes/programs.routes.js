import express from 'express';
import { getAllPrograms, addProgram } from '../controllers/programs.controller.js';
const router = express.Router();

router.get('/get-all-programs', getAllPrograms);


router.post('/add-program', addProgram);

export default router;

