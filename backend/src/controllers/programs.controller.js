import asyncHandler from '../utils/asyncHandler.js';
import {
  getAllProgramsModel,
  addProgramModel,
  updateProgramModel,
  removeProgramModel,
  getProgramByIdModel,
  getProgramByUsernameModel
} from "../models/programs.model.js";

// Get all programs
export const getAllPrograms = asyncHandler(async (req, res) => {
  const result = await getAllProgramsModel(); 
  res.status(200).json(result.recordset);
});

// Get a program by id
export const getProgramById = asyncHandler(async (req, res) => {
  const result = await getProgramByIdModel(req.params.id);
  if (result.recordset.length === 0) {
    res.status(404).json({ error: "Program not found" });
    return;
  }
  res.status(200).json(result.recordset[0]);
});

// Get user program by username
export const  getUserProgram  = asyncHandler(async (req, res) => {
  const result = await getProgramByUsernameModel(req.params.username);
  if (result.recordset.length === 0) {
    res.status(404).json({ error: "Program not found" });
    return;
  }
  res.status(200).json(result.recordset[0]);
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
