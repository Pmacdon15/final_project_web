import sql from 'mssql';
import { config } from '../db/index.js';

export const commentRateLimiter = async (req, res, next) => {
  const userEmail = req.user.email; // Use the email from the authenticated user

  try {
    await sql.connect(config);
    const recentComment = await sql.query`
      SELECT TOP 1 date 
      FROM comments 
      WHERE email = ${userEmail} 
      ORDER BY date DESC
    `;

    if (recentComment.recordset.length > 0) {
      const lastCommentDate = new Date(recentComment.recordset[0].date);
      const now = new Date();
      const timeSinceLastComment = (now - lastCommentDate) / 1000; // in seconds

      if (timeSinceLastComment < 60) { // Example: 60-second cooldown
        return res.status(429).json({ message: 'You are commenting too frequently. Please wait before trying again.' });
      }
    }

    next();
  } catch (err) {
    console.error('Error checking comment rate:', err);
    return res.status(500).json({ message: 'Error checking comment rate', error: err.message });
  }
};

  