import express from "express";
import { createNewUserComment} from "../controllers/clientComment.controller.js";
import { commentRateLimiter} from "../middlewares/comment.middleware.js";


const router = express.Router();

router.post("/comment", commentRateLimiter, createNewUserComment);



export default router;