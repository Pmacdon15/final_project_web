import express from 'express';
import {
  createNewUserComment,
  updateUserComment,
  deleteUserComment
} from '../controllers/clientComment.controller.js';

const router = express.Router();

// Route to create a new user comment
router.post('/comments', createNewUserComment);

// // Route to update an existing user comment by ID
// router.put('/comments/:commentId', updateUserComment);

// // Route to delete a user comment by ID
// router.delete('/comments/:commentId', deleteUserComment);

export default router;
