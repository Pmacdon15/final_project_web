import sql from 'mssql';
import { config } from '../db/index.js';
import bcrypt from 'bcrypt';
import { poolPromise } from '../db/index.js';


export const getUserModel = async (userId) => {
  await sql.connect(config);
  const result = await sql.query`SELECT * FROM users WHERE id = ${userId}`;
  return result;
};

export const getUserByUsername = async (username) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('username', sql.VarChar, username) 
      .query('SELECT * FROM users WHERE username = @username'); 
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
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input('id', sql.VarChar, id) 
    .query('SELECT * FROM users WHERE id = @id'); 
  return result.recordset[0];
};
//Get user by username
export const getUserByUsernameModel = async (username) => {
  await sql.connect(config);
  const result =
    await sql.query`SELECT * FROM users WHERE username = ${username}`;
  return result.recordset[0];
};

export const createUserModel = async (userData) => {
  const {
    isAdmin=0, 
    firstName,
    lastName,
    birthday,
    phone,
    email,
    department,
    program,
    username,
    password,
  } = userData;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('isAdmin', sql.Bit, isAdmin) 
      .input('firstName', sql.VarChar, firstName) 
      .input('lastName', sql.VarChar, lastName) 
      .input('birthday', sql.VarChar, birthday) 
      .input('phone', sql.VarChar, phone) 
      .input('email', sql.VarChar, email) 
      .input('department', sql.VarChar, department) 
      .input('program', sql.VarChar, program) 
      .input('username', sql.VarChar, username) 
      .input('password', sql.VarChar, password) 
      .query(
        `INSERT INTO users (isAdmin, firstName, lastName, birthday, phone, email, department, program, username, password)
    VALUES (@isAdmin, @firstName, @lastName, @birthday, @phone, @email, @department, @program, @username, @password);
    SELECT SCOPE_IDENTITY() AS id;`
      ); 
      return result.recordset[0]?.id || null; //will return the id created
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
  }
};

// Update user by ID
export const updateUserModel = async (id, userData) => {
  const { firstName, lastName, birthday, phone, email, program } = userData;

  try {
    await sql.connect(config);
    const result = await sql.query`
      UPDATE users
      SET firstName = ${firstName}, lastName = ${lastName}, birthday = ${birthday}, phone = ${phone}, email = ${email}
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
  const pool = await poolPromise;
  try {
    const result = await pool
      .request()
      .input('id', sql.VarChar, id) // Bind user input safely
      .query('DELETE FROM users WHERE id = @id'); // Execute secure query
    if (result.rowsAffected[0] === 0) {
      throw new Error('User not found');
    }
    return result;
  } catch (err) {
    console.error('Error deleting user:', err);
    throw err;
  }
};

// Update user password
export const updateUserPasswordModel = async (id, newPassword) => {
  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  try {
    await sql.connect(config);
    const result = await sql.query`
      UPDATE users
      SET password = ${hashedPassword}
      WHERE id = ${id}
    `;
    if (result.rowsAffected[0] === 0) {
      throw new Error('User not found or password not updated');
    }
    return result;
  } catch (err) {
    console.error('Error updating password:', err);
    throw err;
  }
};
