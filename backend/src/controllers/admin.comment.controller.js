import asyncHandler from '../utils/asyncHandler.js';
import { getAdminCommentModel } from '../models/admin.comment.model.js';

/**
 * Get all comments (Admin-only)
 */
export const getAllComments = asyncHandler(async (req, res) => {
  const comments = await getAdminCommentModel();
  res.status(200).json(comments);
});
