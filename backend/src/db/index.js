/*
SQL Server Configuration
This file holds the configuration to connect to your SQL Server instance.
*/

import dotenv from 'dotenv';
dotenv.config();

console.log(`DB_SERVER: ${process.env.DB_SERVER}`);
console.log(`DB_DATABASE: ${process.env.DB_DATABASE}`);

export const config = {
  server: process.env.DB_SERVER || 'default_server_name',      // SQL Server name from the .env file
  database: process.env.DB_DATABASE,                          // Database name from the .env file
  options: {
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERT === 'true',  // Convert to boolean
  },
  authentication: {
    type: 'default',                                           // Use 'ntlm' for Windows Authentication / 'default' for SQL Server Authentication
    options: {
      userName: process.env.DB_USER,                          // Windows username from the .env file
      password: process.env.DB_PASSWORD,                      // No password for Windows Authentication
    },
  },
};

// config for Windows Authentication (Hardcoded config)
/*
export const config = {
  server: 'A018994\\SQLEXPRESS',   // Your server name from the screenshot
  database: 'your_database',       // The database you are connecting to
  options: {
    trustServerCertificate: true,  // Trust the server certificate
  },
  authentication: {
    type: 'ntlm',                  // Use NTLM for Windows Authentication
    options: {
      domain: 'BOWVALLEY',         // Your domain
      userName: 'hcamargo',        // Your Windows username
      password: '',                // No password required for Windows Authentication
    },
  },
};
/*



// config for students (Hardcoded config)
/*
export const config = {
  user: 'your_username',        // Replace with your SQL Server username
  password: 'your_password',    // Replace with your SQL Server password
  server: 'localhost',          // Server host (localhost if it's on your machine)
  database: 'your_database',    // Database name
  options: {
    trustServerCertificate: true, // Required for local development
  },
};
*/