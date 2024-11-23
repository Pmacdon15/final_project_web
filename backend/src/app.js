import express from "express";
import dotenv from "dotenv";
// import sampleRoutes from './routes/sample.routes.js';
import programs from './routes/programs.routes.js';
// import courses from './routes/courses.routes.js';
import adminCoursesRoutes from './routes/adminCourses.routes.js';
import users from './routes/users.routes.js';
import authRoutes from './routes/auth.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { authenticateToken } from './middlewares/auth.middleware.js'; // **Import Middleware**


// Load .env file
dotenv.config();

// Setup for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url); // Converts the URL of the current module (import.meta.url) into a file path.
const __dirname = dirname(__filename); // Extracts the directory path of the current file.

const app = express();
app.use(express.json()); // Middleware for JSON parsing
app.use(express.urlencoded({ extended: true })); // Middleware for form data (URL-encoded)

// Serve static HTML files from the "public" folder (any file inside the public folder can be accessed by the browser directly)
app.use(express.static("public"));


app.use('/api/v1/', programs);

// Authentication Routes
app.use('/api/v1/', authRoutes);

// Protected Admin Routes
app.use('/api/v1/admin', authenticateToken,  adminCoursesRoutes); // **Apply Authentication Middleware**
app.use('/api/v1/client', authenticateToken , users); 

// Default root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/all-programs", (req, res) => {
  res.sendFile(path.join(__dirname, "public/programs.html"));
});

export default app;
