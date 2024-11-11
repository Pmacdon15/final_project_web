import sql from 'mssql';
import { config } from '../db/index.js'

export const getAllCourses = async (req, res) => {
  try {
    console.log('getAllCourses called');
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM courses');
    console.log('Query result:', result.recordset);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching classes data:', err);
    res.status(500).json({ error: 'Failed to retrieve courses data' });
  }
};