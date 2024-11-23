import {
  getAllUsersModel,
  getUserByIdModel,
  createUserModel,
  deleteUserModel,
} from "../models/users.model.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersModel();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await getUserByIdModel(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving user", error: error.message });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  try {
    await createUserModel(req.body);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  try {
    await getUserByIdModel(req.params.id, req.body);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(404).json({ message: "User not found", error: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    await deleteUserModel(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};
