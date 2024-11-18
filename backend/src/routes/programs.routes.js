import express from 'express';
import { getAllPrograms , removeProgram} from '../controllers/programs.controller.js';
const router = express.Router();

router.get('/get-all-programs', getAllPrograms);
router.delete('/remove-program/:id', removeProgram);

export default router;

