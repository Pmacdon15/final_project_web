import sql from 'mssql';
import { config } from '../db/index.js'

export const getAllPrograms = async (req, res) => {
  try {
    console.log('getAllPrograms called');
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM programs');
    console.log('Query result:', result.recordset);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching programs data:', err);
    res.status(500).json({ error: 'Failed to retrieve programs data' });
  }
};
















//MARK: Add a new program
export const addProgram = async (req, res) => {
  try {
    console.log('addProgram called');
    await sql.connect(config);
    
    const { name, description, durationTerms, tuition } = req.body;
    
    if (!name || !description || !durationTerms || !tuition) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await sql.query`
        INSERT INTO programs (name, description, durationTerms, tuition)
        VALUES (${name}, ${description}, ${durationTerms}, ${tuition});        
      `;
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