import asyncHandler from '../utils/asyncHandler.js';

import {
  getAllCoursesModel,
  removeCourseModel,
  addUserCourseModel,
  removeUserCourseModel,
  getUserCourseModel,
} from "../models/courses.model.js";

// Get All Courses
export const getAllCourses = asyncHandler(async (req, res) => {
  console.log("getAllCourses called");
  const result = await getAllCoursesModel();
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
  const { username, courseId, userTermId, termSeason } = req.params;

  const enrolledCourses = await getUserCourseModel(username);

  const coursesCountByTerm = enrolledCourses.recordset.reduce(
    (acc, current) => {
      acc[current.userTermId] = ++acc[current.userTermId] || 1;
      return acc;
    },
    {}
  );

  // console.log(coursesCountByTerm);

  if (coursesCountByTerm[userTermId] >= 5) {
    res
      .status(403)
      .json({ error: 'You have reached the maximum courses by term.' });
    return;
  }

  const result = await addUserCourseModel(
    username,
    courseId,
    userTermId,
    termSeason
  );

  if (result.rowsAffected[0] === 0) {
    res.status(404).json({ error: 'User course not added' });
    return;
  }

  res.status(201).json({ message: 'User course added successfully' });
});

// Remove User Course
export const removeUserCourse = asyncHandler(async (req, res) => {
  const { username, courseId } = req.params;
  console.log("removeUserCourse called");

  const result = await removeUserCourseModel(username, courseId);
  if (result.rowsAffected[0] === 0) {
    res.status(404).json({ error: "User course not found" });
    return;
  }
});


export const getUserCourses = asyncHandler(async (req, res) => {
  const { username} = req.params;
  const result = await getUserCourseModel(username);

  res.status(200).json(result.recordset);
});
