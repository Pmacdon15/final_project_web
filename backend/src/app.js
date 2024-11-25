import express from "express";
import dotenv from "dotenv";
import adminPrograms from './routes/adminPrograms.routes.js';
import adminCoursesRoutes from './routes/adminCourses.routes.js';
import adminUsersRoutes from './routes/AdminUsers.routes.js';
import clientCoursesRoutes from './routes/clientCourses.routes.js';
import clientUsersRoutes from './routes/clientUsers.routes.js';
import clientCommentRoutes from './routes/ClientComment.routes.js';
import adminCommentsRoutes from './routes/adminComment.routes.js';

import authRoutes from './routes/auth.routes.js';


// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
import { authenticateToken } from './middlewares/auth.middleware.js'; // **Import Middleware**


// Load .env file
dotenv.config();

// Setup for __dirname in ES modules
// const __filename = fileURLToPath(import.meta.url); // Converts the URL of the current module (import.meta.url) into a file path.
// const __dirname = dirname(__filename); // Extracts the directory path of the current file.

const app = express();
app.use(express.json()); // Middleware for JSON parsing
app.use(express.urlencoded({ extended: true })); // Middleware for form data (URL-encoded)

// Authentication Routes
app.use('/api/v1/', authRoutes);

// Protected Admin Routes
app.use('/api/v1/admin', authenticateToken, adminUsersRoutes); // **Apply Authentication Middleware**
app.use('/api/v1/admin', authenticateToken, adminCoursesRoutes);
app.use('/api/v1/admin', authenticateToken, adminPrograms);
app.use('/api/v1/admin', authenticateToken, adminCommentsRoutes);

// Protected Client Routes
app.use('/api/v1/client', authenticateToken, clientUsersRoutes);
app.use('/api/v1/client', authenticateToken, clientCoursesRoutes);
app.use('/api/v1/client', authenticateToken, clientCommentRoutes);



export default app;
