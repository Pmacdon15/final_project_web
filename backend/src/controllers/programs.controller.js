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

