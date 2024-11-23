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

export const getAllUsersModel = async () => { 
  await sql.connect(config);
  const result = await sql.query`SELECT * FROM users`;
  return result.recordset;
};

export const getUserByIdModel = async (id) => {
  await sql.connect(config);
  const result = await sql.query`SELECT * FROM users WHERE id = ${id}`;
  return result.recordset[0];
}

export const createUserModel = async (userData) => {
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

//Update  by ID
export const updateUserModel = async (id, userData) => {
  const { isAdmin, firstName, lastName, birthday, phone, email, department, program, username, password } = userData;
  
  // Hash the password before storing
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    await sql.connect(config);
    const result = await sql.query`
      UPDATE users
      SET isAdmin = ${isAdmin}, firstName = ${firstName}, lastName = ${lastName}, birthday = ${birthday}, phone = ${phone}, email = ${email}, department = ${department}, program = ${program}, username = ${username}, password = ${hashedPassword}
      WHERE id = ${id}
    `;
    return result;
  } catch (err) {
    console.error('Error updating user:', err);
    throw err;
  }
};

// Delete a user
export const deleteUserModel = async (id) => {
  await connectToDB();
  await pool
    .request()
    .input("id", sql.VarChar, id)
    .query("DELETE FROM users WHERE id = @id");
};

