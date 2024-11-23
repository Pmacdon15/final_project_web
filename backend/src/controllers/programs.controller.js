import { getAllProgramsModel, addProgramModel, updateProgramModel, removeProgramModel } from '../models/adminPrograms.model.js';

export const getAllPrograms = async (req, res) => {
  try {
    const result = await getAllProgramsModel();
    console.log('Query result:', result);
    res.status(200).json(result.recordset);

  } catch (err) {
    console.error('Error fetching programs data:', err);
    res.status(500).json({ error: 'Failed to retrieve programs data' });
  }
};

//MARK: Add a new program
export const addProgram = async (req, res) => {
  try {
    console.log('addProgram called');
    const { name, description, durationTerms, tuition } = req.body;

    if (!name || !description || !durationTerms || !tuition) {
      return res.status(400).json({ error: 'All fields are required' });
    }    
    const result = await addProgramModel(name, description, durationTerms, tuition);
    if (result.rowsAffected[0] !== 1) {
      throw new Error('Failed to insert program');
    }
    console.log('Query result:', result);
    res.status(201).json({ message: 'Program added successfully' });

  } catch (err) {
    console.error('Error adding program:', err);
    res.status(500).json({ error: 'Failed to add program' });
  }
}

//TODO: Maybe change this to patch, The benefit is debatable.
//MARK: Update a program
export const updateProgram = async (req, res) => {
  try {
    console.log('updateProgram called');
    const { id } = req.params;
    const { name, description, durationTerms, tuition } = req.body;

    if (!id || !name || !description || !durationTerms || !tuition) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await updateProgramModel(id, name, description, durationTerms, tuition);
    if (result.rowsAffected[0] !== 1) {
      throw new Error('Failed to update program');
    }
    console.log('Query result:', result);
    res.status(200).json({ message: 'Program updated successfully' });
  } catch (err) {
    console.error('Error updating program:', err);
    res.status(500).json({ error: 'Failed to update program' });
  }
}

//MARK: Remove program
export const removeProgram = async (req, res) => {
  try {
    console.log('removeProgram called');
    const result = await removeProgramModel(req.params.id);
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Program not found' });
    }
    console.log('Query result:', result);
    res.status(200).json({ message: 'Program deleted successfully' });
  } catch (err) {
    console.error('Error deleting program:', err);
    res.status(500).json({ error: 'Failed to delete program' });
  }
};


