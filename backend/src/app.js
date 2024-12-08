import express, { urlencoded, json } from "express";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import cors from 'cors'

import dotenv from 'dotenv';
import adminPrograms from './routes/adminPrograms.routes.js';
import adminCoursesRoutes from './routes/adminCourses.routes.js';
import adminUsersRoutes from './routes/adminUsers.routes.js';
import clientCoursesRoutes from './routes/clientCourses.routes.js';
import clientGetCoursesRoutes from './routes/ClientGetCourses.routes.js';
import clientUsersRoutes from './routes/clientUsers.routes.js';
import clientCommentRoutes from './routes/ClientComment.routes.js';
import clientProgramRoutes from './routes/clientProgram.routes.js';
import adminCommentsRoutes from './routes/adminComment.routes.js';
import guestPrograms from './routes/guestPrograms.routes.js';

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

// Middleware for rate-limiting requests
// Protects the server against excessive requests (e.g., DoS attacks).
const limiter = rateLimit({
  limit: 100, // Maximum number of requests allowed per IP
  windowMs: 15 * 60 * 1000, // 15-minute window

  message: "Too many requests from this IP address, please try again later", // Response message for rate-limiting
  headers: true // Include rate limit headers in the response

});

// Serve static HTML files from the "public" folder (any file inside the public folder can be accessed by the browser directly)
app.use(express.static('public'));

app.use(
  json({
    limit: '16kb', // Maximum size of the JSON body
    extended: true,
  })
);

// Middleware for URL-encoded form data with size limits
app.use(
  urlencoded({
    limit: '16kb', // Maximum size of form data
    extended: true,
  })
);

// Middleware for enabling Cross-Origin Resource Sharing (CORS)
// Allows restricted resources to be accessed by client applications from a different domain
app.use(
  cors({
    //make sure that inside of the .env file you put the CORS_ORIGIN=http://localhost:3000
    origin: process.env.CORS_ORIGIN, // Allow requests from this specific origin 
    credentials: true, // Allow credentials (e.g., cookies) to be included in requests
  })
);


// Handle preflight requests for all routes
app.options('*', cors());

// Middleware for parsing cookies
// Makes cookies sent by the client available in `req.cookies`
app.use(cookieParser());

app.use(limiter);

// Authentication Routes
app.use('/api/v1/', authRoutes);

// Handle the errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: err.message || "Internal Server Error",
  });
});

// Protected Admin Routes
app.use('/api/v1/admin', authenticateToken, adminUsersRoutes); // **Apply Authentication Middleware**
app.use('/api/v1/admin', authenticateToken, adminCoursesRoutes);
app.use('/api/v1/admin', authenticateToken, adminPrograms);
app.use('/api/v1/admin', authenticateToken, adminCommentsRoutes);

// Protected Client Routes
app.use('/api/v1/client', clientGetCoursesRoutes);
app.use('/api/v1/client', clientCommentRoutes);
app.use('/api/v1/client', authenticateToken, clientUsersRoutes);
app.use('/api/v1/client', authenticateToken, clientCoursesRoutes);
app.use('/api/v1/client', authenticateToken, clientProgramRoutes);

app.use('/api/v1/guest', guestPrograms);

export default app;
