import sql from 'mssql';
import { config } from '../db/index.js';

export const getUserModel = async (userId) => {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM users WHERE id = ${userId}`;
    return result;
}