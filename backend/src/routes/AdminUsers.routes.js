import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
} from "../controllers/users.controller.js";

const router = express.Router();

// Define routes for users
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.delete("/users/:id", deleteUser);

export default router;
