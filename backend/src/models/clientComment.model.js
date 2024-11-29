import sql from 'mssql';
import { config } from '../db/index.js';
import { poolPromise } from '../db/index.js';

/**
 * Create a new user comment.
 * @param {Object} userCommentData - The data of the comment to be created.
 */
export const createUserCommentModel = async (userCommentData) => {
  const { name, email, comment } = userCommentData;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('name', sql.VarChar, name) // Bind user input safely
      .input('email', sql.VarChar, email) // Bind user input safely
      .input('comment', sql.Text, comment) // Bind user input safely
      .query('INSERT INTO comments (name, email, comment, date) VALUES (@name, @email, @comment, GETDATE())');
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
    const pool = await poolPromise;
    const result = await pool.request()
      .input('commentId', sql.Int, commentId) // Bind user input safely
      .input('name', sql.VarChar, name) // Bind user input safely
      .input('email', sql.VarChar, email) // Bind user input safely
      .input('comment', sql.Text, comment) // Bind user input safely
      .query('UPDATE comments SET name = @name, email = @email, comment = @comment, date = GETDATE() WHERE id = @commentId'); // Execute secure query
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
    const pool = await poolPromise;
    const result = await pool.request()
      .input('commentId', sql.Int, commentId) // Bind user input safely
      .query('DELETE FROM comments WHERE id = @commentId'); // Execute secure query
    if (result.rowsAffected[0] === 0) {
      throw new Error('Comment not found or delete failed');
    }
    return result;
  } catch (err) {
    console.error('Error deleting user comment:', err);
    throw err;
  }
};
