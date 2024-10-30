// ! This file is a sample controller file that demonstrates how to write CRUD operations with SQL queries.

import sql from 'mssql';
import { config } from '../config/dbConfig.js';

export const getSampleData = async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);
    // Execute the SQL query
    const result = await sql.query('SELECT * FROM SampleTable');
    // Return the result set
    res.json(result.recordset);
  } catch (err) {
    // Return an error if the query fails
    res.status(500).json({ error: 'Failed to retrieve sample data' });
  }
};

// export const getSampleData = async (req, res) => {
//   const sampleData = [
//     { id: 1, name: 'John Doe', age: 25 },
//     { id: 2, name: 'Jane Doe', age: 30 },
//     { id: 3, name: 'Alice', age: 35 },
//     { id: 4, name: 'Bob', age: 40 },
//   ];

//   res.status(200).json(sampleData);

// };