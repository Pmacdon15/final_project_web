import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createUser, getUserByUsername } from '../models/users.model.js';

/**
 * User login controller.
 * Validates user credentials and returns a JWT token if successful.
 */
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Fetch user by username
    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


/**
 * User registration controller.
 * Creates a new user with hashed password.
 */
export const register = async (req, res) => {
  const { id, isAdmin, firstName, lastName, birthday, phone, email, department, program, username, password } = req.body;

  try {
    // Check if username already exists
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    // Create new user
    await createUser({ id, isAdmin, firstName, lastName, birthday, phone, email, department, program, username, password });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
