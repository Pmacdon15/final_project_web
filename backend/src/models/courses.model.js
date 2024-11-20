import sql from 'mssql';
import { config } from '../db/index.js'

//MARK: Get All Courses
export const getAllCoursesModel = async () => {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM courses');
    return result;
}; 