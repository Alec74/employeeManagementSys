// Require all things
require('dotenv').config();


const mysql = require('mysql');
const inquirer = require('inquirer');

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: process.env.DB_USER,

  // Your password
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    console.log("Success!")
  });