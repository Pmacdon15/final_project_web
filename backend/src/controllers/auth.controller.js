import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import asyncHandler from '../utils/asyncHandler.js';
import { createUserModel, getUserByUsername, updateUserPasswordModel } from '../models/users.model.js';

/**
 * User login controller.
 * Validates user credentials and returns a JWT token if successful.
 */
export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Fetch user by username
  let user = await getUserByUsername(username);
  if (!user) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);  
  if (!isPasswordValid) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }


  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // Set JWT token as a cookie
  res.cookie('authorization', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    maxAge: 3600000, // 1 hour
  });
  user = { ...user, password: undefined }
  res.status(200).json({ user: user, message: 'Login successful', token });
});

/**
 * User registration controller.
 * Creates a new user with hashed password.
 */
export const register = asyncHandler(async (req, res) => {
  const { isAdmin, firstName, lastName, birthday, phone, email, program, username, password } = req.body;

  // Check if username already exists
  const existingUser = await getUserByUsername(username);
  if (existingUser) {
    res.status(409).json({ error: 'Username already exists' });
    return;
  }

  // Hash password before storing
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = await createUserModel({
    isAdmin,
    firstName,
    lastName,
    birthday,
    phone,
    email,
    department: "Software Department", //default department
    program,
    username,
    password: hashedPassword,
  });

  console.log(hashedPassword);

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // Set JWT token as a cookie
  res.cookie('authorization', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    maxAge: 3600000, // 1 hour
  });

  res.status(201).json({ message: 'User registered successfully', token });
});


/**
 * User logout controller.
 * Clears the JWT token cookie.
 */
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie('authorization', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Match secure settings
  });
  res.status(200).json({ message: 'Logout successful' });
});



/**
 * Change user password.
 * Authenticated users can change their password.
 */
export const changePassword = asyncHandler(async (req, res) => {
  const userId = req.user.id; // Extract user ID from authenticated user
  const { oldPassword, newPassword } = req.body;

  // Fetch the user by ID
  const user = await getUserByUsername(req.user.username); // Use username if applicable
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  // Validate the old password
  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    res.status(401).json({ error: 'Old password is incorrect' });
    return;
  }

  // Hash the new password
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  // Update the user's password
  await updateUserPasswordModel(userId, hashedNewPassword);

  res.status(200).json({ message: 'Password updated successfully' });
});
