import sql from 'mssql';
import { config } from '../db/index.js'

//MARK: Get All Courses
export const getAllCoursesModel = async () => {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM courses');
    return result;
};

//MARK: Remove course
export const removeCourseModel = async (courseId) => {
    await sql.connect(config);
    return await sql.query`DELETE FROM courses WHERE id = ${courseId}`;
};


//MARK: Add Course
export const addUserCourseModel = async (userId,courseId,userTermId, termSeason) => {
    await sql.connect(config);
    return await sql.query`INSERT INTO user_courses 
    (userId, courseId, userTermId, termSeasonId) VALUES (${userId}, ${courseId}, ${userTermId}, 
    (select id from terms where season = ${termSeason}))`;
};
