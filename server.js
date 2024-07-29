const express = require("express");
// Import and require Pool (node-postgres)
const path = require('path');
const { Pool } = require('pg');
const inquirer = require("inquirer");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();

// Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const pool = new Pool(
  {
    // TODO: Enter PostgreSQL username
    user: "postgres",
    // TODO: Enter PostgreSQL password
    password: "Mooney123",
    host: "localhost",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

pool.connect();

function selectChoice() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "appOpenQuestions",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add New Departments",
          "Add New Role",
          "Add New Employee",
          "Update Employee Role",
          "Exit",
        ],
      },
    ])
    .then((data) => {
      switch (data.appOpenQuestions) {
        case "View All Departments":
          manageDepartment();
          break;
        case "View All Roles":
          manageRoles();
          break;
        case "View All Employees":
          viewEmployees();
          break;

        case "View All Departments":
          manageEmployees();
          break;
        case "Add New Departments":
          targetDepartment();
          break;
        case "Add New Role":
          newRole();
          break;
        case "Add New Employee":
          newEmployee();
          break;
        case "Update Employee Role":
          updateExistingRole();
          break;
        case "Exit":
          exit();
          break;
      }
    });
}

function manageDepartment() {
  pool.query("SELECT * FROM department order by id", (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("\n");
    console.table(result);
    selectChoice();
  });
}

function manageRoles() {
  pool.query("SELECT * FROM role", (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("\n");
    console.table(result);
    selectChoice();
  });
}

function manageEmployees() {
  pool.query("SELECT * FROM employee", (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("\n");
    console.table(result);
    selectChoice();
  });
}

function viewEmployees() {
  pool.query("SELECT * FROM employee", (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("\n");
    console.table(result);
    selectChoice();
  });
}

function targetDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What department would you like to add?",
        name: "addDepartment",
      },
    ])
    .then((data) => {
      pool.query(
        `INSERT INTO department (name) VALUES (?)`,
        `${data.addDepartment}`,
        (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log(`\n`);
          console.table(result);
          selectChoice();
        }
      );
    });
}

function newRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What role would you like to add?",
        name: "addNewTitle",
      },
      {
        type: "input",
        message: "What is the salary of the role you would like to add?",
        name: "addNewSalary",
      },
      {
        type: "input",
        message: "What is the department of the role you would like to add?",
        name: "addNewDepartment",
      },
    ])
    .then((data) => {
      pool.query(
        `INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)`,
        [data.addNewTitle, data.addNewSalary, data.addNewDepartment],
        (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log("\n");
          console.table(result);
          selectChoice();
        }
      );
    });
}

function newEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please add employee first name.",
        name: "addNewEmployeeFirstName",
      },
      {
        type: "input",
        message: "Please add employee last name",
        name: "addNewEmployeeLastName",
      },
      {
        type: "input",
        message: "What is the employee role id?",
        name: "addNewEmployeeRoleId",
      },
      {
        type: "input",
        message: "Who is the manager for this employee?",
        name: "newEmployeeManager",
      },
    ])
    .then((data) => {
      pool.query(
        `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
        [
          data.addNewEmployeeFirstName,
          data.addNewEmployeeLastName,
          data.addNewEmployeeRoleId,
          data.newEmployeeManager,
        ],
        (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log("\n");
          console.table(result);
          selectChoice();
        }
      );
    });
}

function updateExistingRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employee_id",
        message: "Enter the employee id you would like to update.",
      },
      {
        type: "input",
        message: "Enter the role id you would like to update.",
        name: "role_id",
      },
    ])
    .then((data) => {
      pool.query(
        "update employee set role_id = ? where id = ?",
        [data.role_id, data.employee_id],
        function (err, data) {
          selectChoice();
        }
      );
    });
}

function exit() {
  return;
}

selectChoice();

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
