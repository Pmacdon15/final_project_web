import express from "express";
import { 
  updateUser,
} from "../controllers/users.controller.js";

const router = express.Router();

router.put("/users/:id", updateUser);


export default router;
