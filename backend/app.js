require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json()); // For parsing application/json

// Configure MySQL connection
const host = process.env.DB_HOST
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const database = process.env.DB_NAME 

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to MySQL
connection.connect(err => {
  if (err) {
    console.error('An error occurred while connecting to the MySQL server:', err);
    process.exit(1); // Optionally exit the process with an error code
  } else {
    console.log('Connected to the MySQL server.');
  }
});


// Define routes here
app.listen(3000, () => {
  console.log('Server is running on port 3000');
  console.log(process.env);
});
