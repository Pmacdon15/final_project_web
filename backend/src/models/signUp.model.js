import sql from "mssql";
import { config } from "../db/index.js";

// Create a connection pool
const pool = new sql.ConnectionPool(config);

// Function to connect to the database
async function connectToDB() {
  if (!pool.connected) {
    await pool.connect();
  }
}

// Get all users
export const getAllUsersModel = async () => {
  await connectToDB();
  const result = await pool.request().query("SELECT * FROM users");
  return result.recordset;
};

// Get user by ID
export const getUserByIdModel = async (id) => {
  await connectToDB();
  const result = await pool
    .request()
    .input("id", sql.VarChar, id)
    .query("SELECT * FROM users WHERE id = @id");
  return result.recordset[0];
};

// Create a new user
export const createUserModel = async (user) => {
  const {
    id,
    isAdmin,
    firstName,
    lastName,
    birthday,
    phone,
    email,
    program,
    username,
    password,
  } = user;
  const department = "Software Department";

  await connectToDB();
  await pool
    .request()
    .input("id", sql.VarChar, id)
    .input("isAdmin", sql.Bit, isAdmin)
    .input("firstName", sql.VarChar, firstName)
    .input("lastName", sql.VarChar, lastName)
    .input("birthday", sql.VarChar, birthday)
    .input("phone", sql.VarChar, phone)
    .input("email", sql.VarChar, email)
    .input("department", sql.VarChar, department)
    .input("program", sql.VarChar, program)
    .input("username", sql.VarChar, username)
    .input("password", sql.VarChar, password)
    .query(`INSERT INTO users (id, isAdmin, firstName, lastName, birthday, phone, email, department, program, username, password) 
            VALUES (@id, @isAdmin, @firstName, @lastName, @birthday, @phone, @email, @department, @program, @username, @password)`);
};

// Update an existing user
export const updateUserModel = async (id, updates) => {
  const {
    isAdmin,
    firstName,
    lastName,
    birthday,
    phone,
    email,
    program,
    username,
    password,
  } = updates;
  await connectToDB();
  const result = await pool
    .request()
    .input("id", sql.VarChar, id)
    .input("isAdmin", sql.Bit, isAdmin)
    .input("firstName", sql.VarChar, firstName)
    .input("lastName", sql.VarChar, lastName)
    .input("birthday", sql.VarChar, birthday)
    .input("phone", sql.VarChar, phone)
    .input("email", sql.VarChar, email)
    .input("program", sql.VarChar, program)
    .input("username", sql.VarChar, username)
    .input("password", sql.VarChar, password).query(`
    UPDATE users 
    SET isAdmin = @isAdmin, firstName = @firstName, lastName = @lastName, birthday = @birthday, 
        phone = @phone, email = @email, program = @program, username = @username, password = @password
    WHERE id = @id
  `);

  if (result.rowsAffected[0] === 0) {
    throw new Error("No user found with the given ID");
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
