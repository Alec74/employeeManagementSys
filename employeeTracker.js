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
        'View Departments',
        'View Roles',
        'View Employees',
        'Update Employee Role ID',
        'Update Employee Manager ID',
        'EXIT'],
    })
    .then((answer) => {
      // based on their answer, call the corresponding function
      if (answer.decision === 'Add Department') {
        addDepartment();
      } else if (answer.decision === 'Add Role') {
        addRole();
      } else if (answer.decision === 'Add Employee') {
        addEmployee();
      } else if (answer.decision === 'View Departments') {
        viewDepartment();
      } else if (answer.decision === 'View Roles') {
        viewRole();
      } else if (answer.decision === 'View Employees') {
        viewEmployee();
      } else if (answer.decision === 'Update Employee Role ID') {
        updateEmpRole();
      } else if (answer.decision === 'Update Employee Manager ID') {
        updateEmpManager();
      } else {
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
        message: 'What is the manager ID associated?',
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
    console.table(res);
    start();
  });
};

// Function to view roles
const viewRole = () => {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

// Function to view employees
const viewEmployee = () => {
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

// Function to update Employee role
const updateEmpRole = () => {
  // Make selectable options for user update selection
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    let all = [];
    for (let i = 0; i < res.length; i++) {
      all.push(res[i].first_name);
    }
    inquirer
      .prompt([
        {
          name: "select",
          type: "list",
          message: "Select an employee to update",
          choices: all,
        },
        {
          name: "roleID",
          type: "input",
          message: "Please provide a new Role ID for the employee",
        },
      ])
      .then((answer) => {
        // update the employee role id
        if (err) throw err;
        connection.query('UPDATE employee SET ? WHERE ?',
          [
            {
              role_id: answer.roleID,
            },
            {
              first_name: answer.select,
            },
          ],
          (err, res) => {
            if (err) throw err;
            viewEmployee();
          })
      })
  });
};

// Function to update Employee manager
const updateEmpManager = () => {
  // Make selectable options for user update selection
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    let all = [];
    for (let i = 0; i < res.length; i++) {
      all.push(res[i].first_name);
    }
    inquirer
      .prompt([
        {
          name: "select",
          type: "list",
          message: "Select an employee to update",
          choices: all,
        },
        {
          name: "managerID",
          type: "input",
          message: "Please provide a new Manager ID for the employee",
        },
      ])
      .then((answer) => {
        // update the employee manager id
        if (err) throw err;
        connection.query('UPDATE employee SET ? WHERE ?',
          [
            {
              manager_id: answer.managerID,
            },
            {
              first_name: answer.select,
            },
          ],
          (err, res) => {
            if (err) throw err;
            viewEmployee();
          })
      })
  });
};

// connect to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err;
  // console.log("Success!")
  start();
});
