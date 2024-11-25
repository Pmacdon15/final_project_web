import asyncHandler from '../utils/asyncHandler.js';
import {
  getAllProgramsModel,
  addProgramModel,
  updateProgramModel,
  removeProgramModel,
} from "../models/adminPrograms.model.js";

// Get all programs
export const getAllPrograms = asyncHandler(async (req, res) => {
  const result = await getAllProgramsModel();
  console.log("Query result:", result);
  res.status(200).json(result.recordset);
});

// Add a new program
export const addProgram = asyncHandler(async (req, res) => {
  console.log("addProgram called");
  const { name, description, durationTerms, tuition } = req.body;

  if (!name || !description || !durationTerms || !tuition) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  const result = await addProgramModel(name, description, durationTerms, tuition);
  if (result.rowsAffected[0] !== 1) {
    throw new Error("Failed to insert program");
  }
  console.log("Query result:", result);
  res.status(201).json({ message: "Program added successfully" });
});

// Update a program
export const updateProgram = asyncHandler(async (req, res) => {
  console.log("updateProgram called");
  const { id } = req.params;
  const { name, description, durationTerms, tuition } = req.body;

  if (!id || !name || !description || !durationTerms || !tuition) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  const result = await updateProgramModel(id, name, description, durationTerms, tuition);
  if (result.rowsAffected[0] !== 1) {
    throw new Error("Failed to update program");
  }
  console.log("Query result:", result);
  res.status(200).json({ message: "Program updated successfully" });
});

// Remove a program
export const removeProgram = asyncHandler(async (req, res) => {
  console.log("removeProgram called");
  const result = await removeProgramModel(req.params.id);

  if (result.rowsAffected[0] === 0) {
    res.status(404).json({ error: "Program not found" });
    return;
  }

  console.log("Query result:", result);
  res.status(200).json({ message: "Program deleted successfully" });
});
