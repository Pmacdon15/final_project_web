
import express from 'express';
import { getUser } from '../controllers/users.controller.js';
const router = express.Router();

router.get('/get-user/id/:id', getUser);

export default router;

