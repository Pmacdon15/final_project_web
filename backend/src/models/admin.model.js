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
export const updateCourseModel = async (courseId, programId, name, description, availableFall, availableWinter, availableSpring, availableSummer) => {
  await sql.connect(config);
  
  // Convert availability values to integers
  const fall = availableFall === 'on' ? 1 : 0;
  const winter = availableWinter === 'on' ? 1 : 0;
  const spring = availableSpring === 'on' ? 1 : 0;
  const summer = availableSummer === 'on' ? 1 : 0;

  // Update the courses table and insert/update availability records in a single query
  await sql.query`
    BEGIN TRANSACTION;
    BEGIN TRY
      UPDATE courses
      SET 
        programId = ${programId}, 
        name = ${name}, 
        description = ${description}
      WHERE id = ${courseId};

      DELETE FROM courses_available_terms
      WHERE courseId = ${courseId};

      IF ${fall} = 1
        INSERT INTO courses_available_terms (courseId, termSeason)
        VALUES (${courseId}, 1);

      IF ${winter} = 1
        INSERT INTO courses_available_terms (courseId, termSeason)
        VALUES (${courseId}, 2);

      IF ${spring} = 1
        INSERT INTO courses_available_terms (courseId, termSeason)
        VALUES (${courseId}, 3);

      IF ${summer} = 1
        INSERT INTO courses_available_terms (courseId, termSeason)
        VALUES (${courseId}, 4);

      COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
      ROLLBACK TRANSACTION;
      THROW;
    END CATCH
  `;

  return { message: 'Course updated successfully' };
};
// Delete a course
export const deleteCourseModel = async (courseId) => {
  await sql.connect(config);
  return await sql.query`DELETE FROM courses WHERE id = ${courseId}`;
};
