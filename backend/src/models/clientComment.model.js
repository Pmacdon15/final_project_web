import sql from 'mssql';
import { config } from '../db/index.js';

/**
 * Create a new user comment.
 * @param {Object} userCommentData - The data of the comment to be created.
 */
export const createUserCommentModel = async (userCommentData) => {
  const { name, email, comment } = userCommentData;

  try {
    await sql.connect(config);
    const result = await sql.query`
      INSERT INTO comments (name, email, comment, date)
      VALUES (${name}, ${email}, ${comment}, GETDATE())
    `;
    return result;
  } catch (err) {
    console.error('Error creating user comment:', err);
    throw err;
  }
};

/**
 * Update a user comment by ID.
 * @param {number} commentId - The ID of the comment to update.
 * @param {Object} updatedCommentData - The updated data for the comment.
 */
export const updateUserCommentModel = async (commentId, updatedCommentData) => {
  const { name, email, comment } = updatedCommentData;

  try {
    await sql.connect(config);
    const result = await sql.query`
      UPDATE comments
      SET name = ${name}, email = ${email}, comment = ${comment}, date = GETDATE()
      WHERE id = ${commentId}
    `;
    if (result.rowsAffected[0] === 0) {
      throw new Error('Comment not found or update failed');
    }
    return result;
  } catch (err) {
    console.error('Error updating user comment:', err);
    throw err;
  }
};

/**
 * Delete a user comment by ID.
 * @param {number} commentId - The ID of the comment to delete.
 */
export const deleteUserCommentModel = async (commentId) => {
  try {
    await sql.connect(config);
    const result = await sql.query`
      DELETE FROM comments WHERE id = ${commentId}
    `;
    if (result.rowsAffected[0] === 0) {
      throw new Error('Comment not found or delete failed');
    }
    return result;
  } catch (err) {
    console.error('Error deleting user comment:', err);
    throw err;
  }
};
