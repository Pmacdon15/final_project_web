import express from 'express';
import { getAllPrograms , removeProgram,addProgram} from '../controllers/programs.controller.js';

const router = express.Router();

router.get('/get-all-programs', getAllPrograms);
router.delete('/remove-program/:id', removeProgram);
router.post('/add-program', addProgram);

export default router;

