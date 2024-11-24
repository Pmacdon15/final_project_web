import sql from 'mssql';
import { config } from '../db/index.js';

export const getAdminCommentModel = async () => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM comments`;
    return result.recordset;
  } catch (err) {
    console.error("Error fetching comments:", err);
    throw err;
  }
};
