import sql from "mssql";
import { config } from '../db/index.js';


export async function getAllProgramsModel() {
    await sql.connect(config);
    return await sql.query('SELECT * FROM programs');
}