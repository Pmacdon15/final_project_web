import asyncHandler from '../utils/asyncHandler.js';
import {
  getAllUsersModel,
  getUserByIdModel,
  getUserByUsernameModel,
  createUserModel,
  deleteUserModel,
} from "../models/users.model.js";

// Get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await getAllUsersModel();
  res.status(200).json(users);
});

// Get a user by ID
export const getUserById = asyncHandler(async (req, res) => {
  const user = await getUserByIdModel(req.params.id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.status(200).json(user);
});
// GetUserByUsername
export const getUserByUsername = asyncHandler(async (req, res) => {
  const user = await getUserByUsernameModel(req.params.username);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.status(200).json(user);
});


// Create a new user
export const createUser = asyncHandler(async (req, res) => {
  await createUserModel(req.body);
  res.status(201).json({ message: "User created successfully" });
});

// Update a user
export const updateUser = asyncHandler(async (req, res) => {
  const updatedUser = await getUserByIdModel(req.params.id, req.body);
  if (!updatedUser) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.status(200).json({ message: "User updated successfully" });
});

// Delete a user
export const deleteUser = asyncHandler(async (req, res) => {
  await deleteUserModel(req.params.id);
  res.status(200).json({ message: "User deleted successfully" });
});
