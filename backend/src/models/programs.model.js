import sql from "mssql";
import { config } from '../db/index.js';


export async function getAllProgramsModel() {
    await sql.connect(config);
    return await sql.query('SELECT * FROM programs');
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
