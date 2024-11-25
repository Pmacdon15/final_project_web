import asyncHandler from "../utils/asyncHandler.js";
import { createUserCommentModel, updateUserCommentModel, deleteUserCommentModel } from "../models/clientComment.model.js";

// Create a new user comment
export const createNewUserComment = asyncHandler(async (req, res) => {
  const userId = req.user?.id; // Authenticated user's ID
  const { name, email, comment } = req.body;

  if (!name || !email || !comment) {
    return res.status(400).json({ message: "Name, email, and comment are required" });
  }

  const userData = { userId, name, email, comment };

  // Save the user comment
  await createUserCommentModel(userData);

  res.status(201).json({ message: "User comment created successfully" });
});

// Update a user comment by ID
export const updateUserComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { name, email, comment } = req.body;

  if (!name || !email || !comment) {
    return res.status(400).json({ message: "Name, email, and comment are required" });
  }

  const updatedCommentData = { name, email, comment };

  // Update the comment
  await updateUserCommentModel(commentId, updatedCommentData);

  res.status(200).json({ message: "User comment updated successfully" });
});

// Delete a user comment by ID
export const deleteUserComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  // Delete the comment
  await deleteUserCommentModel(commentId);

  res.status(200).json({ message: "User comment deleted successfully" });
});
