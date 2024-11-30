import express from "express";
import {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";

const router = express.Router();

// Define routes for users
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.get("/users/username/:username", getUserByUsername);
// router.post("/users", createUser);
// router.put("/users/:id", updateUser);
// router.delete("/users/:id", deleteUser);

export default router;
