import sql from 'mssql';
import { config } from '../db/index.js';

//MARK: Get All Courses
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

//MARK: Remove course
export const removeCourseModel = async (courseId) => {
  await sql.connect(config);
  return await sql.query`DELETE FROM courses WHERE id = ${courseId}`;
};

//MARK: Add Course
export const addUserCourseModel = async (
  username,
  courseId,
  userTermId,
  termSeason
) => {
  console.log('addUserCourseModel called');
  try {
    await sql.connect(config);

    // Debug: Check if username exists
    const userResult = await sql.query`
    SELECT id FROM users WHERE username = ${username};
  `;
    console.log('User Query Result:', userResult);

    if (!userResult.recordset[0]) {
      throw new Error(`User with username '${username}' not found`);
    }

    const userId = userResult.recordset[0].id;

    // Debug: Check if termSeason exists
    const termResult = await sql.query`
    SELECT id FROM terms WHERE season = ${termSeason};
  `;
    console.log('Term Query Result:', termResult);

    if (!termResult.recordset[0]) {
      throw new Error(`Term season '${termSeason}' not found`);
    }

    const termSeasonId = termResult.recordset[0].id;

    // Insert the course
    await sql.query`
    INSERT INTO user_courses (userId, courseId, userTermId, termSeasonId)
    VALUES (${userId}, ${courseId}, ${userTermId}, ${termSeasonId});
  `;
  } catch (error) {
    console.error('Error adding user course:', error);
    return error;
  }
};
// export const addUserCourseModel = async (
//   username,
//   courseId,
//   userTermId,
//   termSeason
// ) => {
//   await sql.connect(config);

//   return await sql.query`
//     INSERT INTO user_courses (userId, courseId, userTermId, termSeasonId)
//     VALUES (
//       (SELECT id FROM users WHERE username = ${username}),
//       ${courseId},
//       ${userTermId},
//       (SELECT id FROM terms WHERE season = ${termSeason})
//     )
//   `;
// };



//MARK: Remove User Course
export const removeUserCourseModel = async (userId, courseId) => {
  await sql.connect(config);
  return await sql.query`DELETE FROM user_courses WHERE userId = ${userId} AND courseId = ${courseId}`;
};

export const getUserCourseModel = async (username) => {
  await sql.connect(config);
  return await sql.query`
    SELECT 
    u.id, 
    u.username, 
    uc.courseId, 
    c.name,
    c.description,
    t.season AS termSeason,
    uc.userTermId, 
    uc.termSeasonId
FROM 
    users u
JOIN 
    user_courses uc 
ON 
    u.id = uc.userId
JOIN
    courses c
ON  
    c.id = uc.courseId
JOIN
    terms t
ON
    t.id = uc.termSeasonId
WHERE 
    u.username = ${username};
  `;
};
