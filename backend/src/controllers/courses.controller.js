import asyncHandler from '../utils/asyncHandler.js';
import sql from "mssql";
import { config } from "../db/index.js";
import {
  getAllCoursesModel,
  removeCourseModel,
  addUserCourseModel,
  removeUserCourseModel,
} from "../models/courses.model.js";

// Get All Courses
export const getAllCourses = asyncHandler(async (req, res) => {
  console.log("getAllCourses called");
  const result = await getAllCoursesModel();
  console.log("Query result:", result.recordset);
  res.status(200).json(result.recordset);
});

// Remove Course
export const removeCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  console.log("removeCourse called");
  const result = await removeCourseModel(courseId);
  console.log("Query result:", result);

  if (result.rowsAffected[0] === 0) {
    res.status(404).json({ error: "Course not found" });
    return;
  }

  res.status(200).json({ message: "Course removed successfully" });
});

// Add User Course
export const addUserCourse = asyncHandler(async (req, res) => {
  const { userId, courseId, userTermId, termSeason } = req.params;
  console.log("addUserCourse called");
  console.log("userId:", userId);

  const result = await addUserCourseModel(userId, courseId, userTermId, termSeason);
  console.log("Query result:", result);

  if (result.rowsAffected[0] === 0) {
    res.status(404).json({ error: "User course not added" });
    return;
  }

  res.status(201).json({ message: "User course added successfully" });
});

// Remove User Course
export const removeUserCourse = asyncHandler(async (req, res) => {
  const { userId, courseId } = req.params;
  console.log("removeUserCourse called");

  const result = await removeUserCourseModel(userId, courseId);
  if (result.rowsAffected[0] === 0) {
    res.status(404).json({ error: "User course not found" });
    return;
  }

  res.status(200).json({ message: "User course removed successfully" });
});
