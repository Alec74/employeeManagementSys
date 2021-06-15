INSERT INTO department (id, name) VALUES (1, "Accounting");

INSERT INTO role (id, title, salary, department_id) VALUES (1, "Head Accountant", 100000.67, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (1, "Terry", "Smith", 1, NULL);
