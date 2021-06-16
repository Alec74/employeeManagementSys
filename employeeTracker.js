// Require all things
require('dotenv').config();
const cTable = require('console.table');
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
  // Database being accessed
  database: process.env.DB_NAME,
});

// function which prompts the user for what action they should take
const start = () => {
  inquirer
    .prompt({
      name: 'decision',
      type: 'list',
      message: 'Please choose an option',
      choices: ['Add Department',
        'Add Role',
        'Add Employee',
        'View Department',
        'View Role',
        'View Employees',
        'Update Employee Roles',
        'EXIT'],
    })
    .then((answer) => {
      // based on their answer, either call the bid or the post functions
      if (answer.decision === 'Add Department') {
        addDepartment();
      } else if (answer.decision === 'Add Role') {
        addRole();
      } else if (answer.decision === 'Add Employee'){
        addEmployee()
      } else if (answer.decision === 'View Department') {
        viewDepartment();
      } else if (answer.decision === 'View Role'){
        viewRole()
      } else if (answer.decision === 'View Employees'){
        viewEmployee()
      }else {
        connection.end();
      }
    });
};



// Function to add a new department
const addDepartment = () => {
  // prompt for info about department
  inquirer
    .prompt([
      {
        name: 'id',
        type: 'input',
        message: 'What is the department id number?',
      },
      {
        name: 'name',
        type: 'input',
        message: 'What is the department name?',
      },
    ])
    .then((answer) => {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        'INSERT INTO department SET ?',
        {
          id: answer.id,
          name: answer.name,
        },
        (err) => {
          if (err) throw err;
          console.log('Your new department was added successfully!');
          // re-prompt the user for if they want to continue or finish
          start();
        }
      );
    });
};

// Function to add new role
const addRole = () => {
  // prompt for info about role
  inquirer
    .prompt([
      {
        name: 'id',
        type: 'input',
        message: 'What is the role id number?',
      },
      {
        name: 'title',
        type: 'input',
        message: 'What is the role title?',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'What is the role salary?',
      },
      {
        name: 'dID',
        type: 'input',
        message: 'What is the department ID associated?',
      },
    ])
    .then((answer) => {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        'INSERT INTO role SET ?',
        {
          id: answer.id,
          title: answer.title,
          salary: answer.salary,
          department_id: answer.dID,
        },
        (err) => {
          if (err) throw err;
          console.log('Your new role was added successfully!');
          // re-prompt the user for if they want to continue or finish
          start();
        }
      );
    });
};


// Function to add new employee
const addEmployee = () => {
  // prompt for info about employee
  inquirer
    .prompt([
      {
        name: 'id',
        type: 'input',
        message: 'What is the employee id number?',
      },
      {
        name: 'fName',
        type: 'input',
        message: 'What is their first name?',
      },
      {
        name: 'lName',
        type: 'input',
        message: 'What is their last name?',
      },
      {
        name: 'rID',
        type: 'input',
        message: 'What is the role ID associated?',
      },
      {
        name: 'mID',
        type: 'input',
        message: 'What is the manager ID associated? (type "NULL" if n/a)',
      },
    ])
    .then((answer) => {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        'INSERT INTO employee SET ?',
        {
          id: answer.id,
          first_name: answer.fName,
          last_name: answer.lName,
          role_id: answer.rID,
          manager_id: answer.mID,
        },
        (err) => {
          if (err) throw err;
          console.log('Your new employee was added successfully!');
          // re-prompt the user for if they want to continue or finish
          start();
        }
      );
    });
};

// Function to view departments
const viewDepartment = () => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    cTable(res);
  })
};

// Function to view roles
const viewRole = () => {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    cTable(res);
  })
};

// Function to view employees
const viewEmployee = () => {

};

// connect to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err;
  // console.log("Success!")
  start();
});