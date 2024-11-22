import sql from 'mssql';
import { config } from '../db/index.js';
import bcrypt from 'bcrypt';

export const getUserModel = async (userId) => {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM users WHERE id = ${userId}`;
    return result;
}

export const getUserByUsername = async (username) => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM users WHERE username = ${username}`;
    return result.recordset[0] || null;
  } catch (err) {
    console.error('Error fetching user by username:', err);
    throw err;
  }
};

export const createUser = async (userData) => {
  const { id, isAdmin, firstName, lastName, birthday, phone, email, department, program, username, password } = userData;
  
  // Hash the password before storing
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    await sql.connect(config);
    const result = await sql.query`
      INSERT INTO users (id, isAdmin, firstName, lastName, birthday, phone, email, department, program, username, password)
      VALUES (${id}, ${isAdmin}, ${firstName}, ${lastName}, ${birthday}, ${phone}, ${email}, ${department}, ${program}, ${username}, ${hashedPassword})
    `;
    return result;
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
  }
};
