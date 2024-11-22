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
export const getAllCourses = async (req, res) => {
  try {
    const result = await getAllCoursesModel();
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

// Add a new course
export const addCourse = async (req, res) => {
  const { programId, name, description } = req.body;
  try {
    const result = await addCourseModel(programId, name, description);
    res.status(201).json({ message: 'Course added successfully', courseId: result.recordset.insertId });
  } catch (err) {
    console.error('Error adding course:', err);
    res.status(500).json({ error: 'Failed to add course' });
  }
};

// Update an existing course
export const updateCourse = async (req, res) => {
  const { courseId } = req.params;
  const { programId, name, description } = req.body;
  try {
    const result = await updateCourseModel(courseId, programId, name, description);
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json({ message: 'Course updated successfully' });
  } catch (err) {
    console.error('Error updating course:', err);
    res.status(500).json({ error: 'Failed to update course' });
  }
};

// Delete a course
export const deleteCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    const result = await deleteCourseModel(courseId);
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    console.error('Error deleting course:', err);
    res.status(500).json({ error: 'Failed to delete course' });
  }
};
