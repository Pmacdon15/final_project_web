import sql from 'mssql';
import { config } from '../db/index.js'

export const getAllCourses = async (req, res) => {
  try {
    console.log('getAllCourses called');
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM courses');
    console.log('Query result:', result.recordset);
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Error fetching classes data:', err);
    res.status(500).json({ error: 'Failed to retrieve courses data' });
  }
};

export const removeUserCourse = async (req, res) => {
  const { userId, courseId } = req.params;
  try {
    console.log('removeUserCourse called');
    await sql.connect(config);
    const result = await sql.query`DELETE FROM user_courses WHERE userId = ${userId} AND courseId = ${courseId}`;
    // console.log('Query result:', result);
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'User course not found' });
    }
    res.status(200).json({ message: 'User course removed successfully' });
  } catch (err) {
    console.error('Error removing user course:', err);
    res.status(500).json({ error: 'Failed to remove user course' });
  }
};