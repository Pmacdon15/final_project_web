import asyncHandler from '../utils/asyncHandler.js';
import { getAllCoursesModel, addCourseModel, updateCourseModel, deleteCourseModel } from '../models/admin.model.js';

/**
 * Middleware to check if the user is an admin.
 * Assumes that authenticateToken middleware has already been applied.
 */
export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  const { isAdmin } = req.user;
  if (!isAdmin) {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
  next();
};

// Get all courses
export const getAllCourses = asyncHandler(async (req, res) => {
  const result = await getAllCoursesModel();
  res.status(200).json(result.recordset);
});

// Add a new course
export const addCourse = asyncHandler(async (req, res) => {
  const { programId, name, description } = req.body;
  const result = await addCourseModel(programId, name, description);
  res.status(201).json({ message: 'Course added successfully', courseId: result.recordset.insertId });
});

// Update an existing course
export const updateCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { programId, name, description } = req.body;
  const result = await updateCourseModel(courseId, programId, name, description);
  if (result.rowsAffected[0] === 0) {
    return res.status(404).json({ error: 'Course not found' });
  }
  res.status(200).json({ message: 'Course updated successfully' });
});

// Delete a course
export const deleteCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const result = await deleteCourseModel(courseId);
  if (result.rowsAffected[0] === 0) {
    return res.status(404).json({ error: 'Course not found' });
  }
  res.status(200).json({ message: 'Course deleted successfully' });
});
