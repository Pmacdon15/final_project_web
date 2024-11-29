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
    const result = await pool.request()
      .input('username', sql.VarChar, username) // Bind user input safely
      .query('SELECT * FROM users WHERE username = @username'); // Execute secure query
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
  const result = await pool.request()
    .input('id', sql.VarChar, id) // Bind user input safely
    .query('SELECT * FROM users WHERE id = @id'); // Execute secure query
  return result.recordset[0];
};

export const createUserModel = async (userData) => {
  const { id, isAdmin, firstName, lastName, birthday, phone, email, department, program, username, password } = userData;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.VarChar, id) // Bind user input safely
      .input('isAdmin', sql.Bit, isAdmin) // Bind user input safely
      .input('firstName', sql.VarChar, firstName) // Bind user input safely
      .input('lastName', sql.VarChar, lastName) // Bind user input safely
      .input('birthday', sql.VarChar, birthday) // Bind user input safely
      .input('phone', sql.VarChar, phone) // Bind user input safely
      .input('email', sql.VarChar, email) // Bind user input safely
      .input('department', sql.VarChar, department) // Bind user input safely
      .input('program', sql.VarChar, program) // Bind user input safely
      .input('username', sql.VarChar, username) // Bind user input safely
      .input('password', sql.VarChar, password) // Bind user input safely
      .query('INSERT INTO users (id, isAdmin, firstName, lastName, birthday, phone, email, department, program, username, password) VALUES (@id, @isAdmin, @firstName, @lastName, @birthday, @phone, @email, @department, @program, @username, @password)'); // Execute secure query
    return result;
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
  }
};

// Update user by ID
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
  const pool = await poolPromise;
  try {
    const result = await pool.request()
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
