import sql from 'mssql';
import { config } from '../db/index.js';

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


