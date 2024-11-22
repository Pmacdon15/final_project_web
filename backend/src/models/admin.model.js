import sql from 'mssql';
import { config } from '../db/index.js';

// Get all courses
export const getAllCoursesModel = async () => {
  await sql.connect(config);
  return await sql.query`SELECT * FROM courses`;
};

// Add a new course
export const addCourseModel = async (programId, name, description) => {
  try {
    await sql.connect(config);
    const result = await sql.query`
      INSERT INTO courses (programId, name, description)
      VALUES (${programId}, ${name}, ${description});
      SELECT SCOPE_IDENTITY() AS insertId;
    `;
    return result;
  } catch (err) {
    console.error('Database error during course insertion:', err);
    throw err;
  }
};

// Update an existing course
export const updateCourseModel = async (courseId, programId, name, description) => {
  await sql.connect(config);
  return await sql.query`
    UPDATE courses
    SET programId = ${programId}, name = ${name}, description = ${description}
    WHERE id = ${courseId}
  `;
};

// Delete a course
export const deleteCourseModel = async (courseId) => {
  await sql.connect(config);
  return await sql.query`DELETE FROM courses WHERE id = ${courseId}`;
};
