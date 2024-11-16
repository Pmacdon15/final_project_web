import sql from 'mssql';
import { config } from '../db/index.js'

//MARK: Get All Courses
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
//MARK: Add User Course
export const addUserCourse = async (req, res) => {
  const { userId, courseId, userTermId, termSeason } = req.params;
  try {
    console.log('addUserCourse called');
    await sql.connect(config);
    const result = await sql.query`INSERT INTO user_courses (userId, courseId, userTermId, termSeasonId) VALUES (${userId}, ${courseId}, ${userTermId}, (select id from term where season = ${termSeason}))`;
    console.log('Query result:', result);
    res.status(201).json({ message: 'User course added successfully' });
  } catch (err) {
    console.error('Error adding user course:', err);
    res.status(500).json({ error: 'Failed to add user course' });
  }
};

//MARK: Remove User Course
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