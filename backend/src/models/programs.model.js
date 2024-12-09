import sql from "mssql";
import { config } from '../db/index.js';


export async function getAllProgramsModel() {
    await sql.connect(config);
    return await sql.query('SELECT * FROM programs');
}

export async function getProgramByUsernameModel(username) {
    await sql.connect(config);
    const user = await sql.query`SELECT id FROM users WHERE username = ${username};`;
    const userId = user.recordset[0].id;
  
    return await sql.query`
      SELECT 
        p.*
      FROM 
        programs p
      JOIN 
        user_programs up
      ON 
        p.id = up.programId
      WHERE 
        up.userId = ${userId};
    `;
  }
export async function getProgramByIdModel(id) {
    await sql.connect(config);
    return await sql.query`SELECT * FROM programs WHERE id = ${id}`;
}

export async function addProgramModel(name, description, durationTerms, tuition) {
    await sql.connect(config);
    return await sql.query`
        INSERT INTO programs (name, description, durationTerms, tuition)
        VALUES (${name}, ${description}, ${durationTerms}, ${tuition});        
      `;
}

export async function updateProgramModel(id, name, description, durationTerms, tuition) {
    await sql.connect(config);
    return await sql.query`
        UPDATE programs
        SET name = ${name}, description = ${description}, durationTerms = ${durationTerms}, tuition = ${tuition}
        WHERE id = ${id};
      `;
}

export async function removeProgramModel(id) {
    await sql.connect(config);
    const result = await sql.query`DELETE FROM programs WHERE id = ${id}`;
    return result;
}