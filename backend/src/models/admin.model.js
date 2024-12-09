import sql from 'mssql';
import { config } from '../db/index.js';

// Get all courses
export const getAllCoursesModel = async () => {
   await sql.connect(config);
   const result = await sql.query(`
     SELECT 
         c.*,
         CASE WHEN EXISTS (SELECT 1 FROM courses_available_terms cat WHERE cat.courseId = c.id AND cat.termSeason = 1) THEN 1 ELSE 0 END AS availableFall,
         CASE WHEN EXISTS (SELECT 1 FROM courses_available_terms cat WHERE cat.courseId = c.id AND cat.termSeason = 2) THEN 1 ELSE 0 END AS availableWinter,
         CASE WHEN EXISTS (SELECT 1 FROM courses_available_terms cat WHERE cat.courseId = c.id AND cat.termSeason = 3) THEN 1 ELSE 0 END AS availableSpring,
         CASE WHEN EXISTS (SELECT 1 FROM courses_available_terms cat WHERE cat.courseId = c.id AND cat.termSeason = 4) THEN 1 ELSE 0 END AS availableSummer
     FROM 
         courses c;
   `);
   return result;
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
