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
                    // start();
                }
            );
        });
};