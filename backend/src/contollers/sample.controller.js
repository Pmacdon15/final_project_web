// ! This file is a sample controller file that demonstrates how to write CRUD operations with SQL queries.

import sql from 'mssql';
import { config } from '../db/index.js'

export const getSampleData = async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);
    // Execute the SQL query
    const result = await sql.query('SELECT * FROM SampleData');
    // Return the result set
    res.json(result.recordset);
  } catch (err) {
    // Return an error if the query fails
    res.status(500).json({ error: 'Failed to retrieve sample data' });
  }
};

