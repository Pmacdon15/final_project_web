import { getAdminCommentModel } from '../models/admin.comment.model.js';

/**
 * Get all comments (Admin-only)
 */
export const getAllComments = async (req, res) => {
  try {
    const comments = await getAdminCommentModel();
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Unable to fetch comments" });
  }
};
