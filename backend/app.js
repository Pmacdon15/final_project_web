import express from 'express';
import dotenv from 'dotenv';
import sampleRoutes from './routes/sampleRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load .env file
dotenv.config();

// Setup for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url); // Converts the URL of the current module (import.meta.url) into a file path.
const __dirname = dirname(__filename); // Extracts the directory path of the current file.

const app = express();
app.use(express.json()); // Middleware for JSON parsing
app.use(express.urlencoded({ extended: true })); // Middleware for form data (URL-encoded)


// Serve static HTML files from the "public" folder (any file inside the public folder can be accessed by the browser directly)
app.use(express.static('public'));

// Use the user and order routes
app.use('/api/v1', sampleRoutes);

// Default root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Basic CRUD operations -> http://localhost:${port}/index.html`);  
});
