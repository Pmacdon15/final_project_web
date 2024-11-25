import { createUserCommentModel } from "../models/clientComment.model.js";

export const createNewUserComment = async (req, res) => {
  const userId = req.user.id; // Authenticated user's ID

  try {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      comment: req.body.comment
    };

    await createUserCommentModel(userData);
    res.status(201).json({ message: "User comment created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user comment", error: error.message });
  }
};


