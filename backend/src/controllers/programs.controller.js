import sql from 'mssql';
import { config } from '../db/index.js'

export const getAllPrograms = async (req, res) => {
  try {
    console.log('getAllPrograms called');
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM programs');
    console.log('Query result:', result.recordset);
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Error fetching programs data:', err);
    res.status(500).json({ error: 'Failed to retrieve programs data' });
  }
};

//MARK: Remove program
export const removeProgram = async (req, res) => {
  try {
    console.log('removeProgram called');
    await sql.connect(config);
    const result = await sql.query`DELETE FROM programs WHERE id = ${req.params.id}`;
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

