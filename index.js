const fs = require('fs')
const inquirer = require('inquirer')
const jest = require('jest')
const Employee = require('./empClasses/employee'); 
const Engineer = require('./empClasses/engineer');
const Manager = require('./empClasses/manager');
const Intern = require('./empClasses/intern');

let employees = [];

const builderQuestions = [
                {
                    name: 'name',
                    type: 'input',
                    message: 'Enter Employee Name:'
                }, {
                    name: 'employID',
                    type: 'input',
                    message: 'Enter Employee ID:'
                }, {
                    name: 'email',
                    type: 'input',
                    message: 'Enter Employee Email:'
                }, {
                    name: 'role',
                    type: 'list',
                    message: 'Select Employee Role:',
                    choices: ['Engineer', 'Intern', 'Manager']
                }, {
                    name: 'officeNumber',
                    type: 'input',
                    message: 'Enter Office Number:',
                    when: function (answers) {
                        return answers.role === 'Manager'
                    }
                }, {
                    name: 'github',
                    type: 'input',
                    message: 'Enter Github Info:',
                    when: function (answers) {
                        return answers.role === 'Engineer'
                    }
                }, {
                    name: 'schoolName',
                    type: 'input',
                    message: 'Enter School Name:',
                    when: function (answers) {
                        return answers.role === 'Intern'
                    }
                }
            ]

function employeeBuilder(loopFunction) {
    console.log('before try')
    try {
        console.log('inside try')
        inquirer.prompt(builderQuestions).then(function (response) {
            
            switch(response.role) {
                case 'Manager':
                    newEmployee = new Manager(response.name, response.employID, response.email, response.officeNumber);
                  break;
                case 'Intern':
                    newEmployee = new Intern(response.name, response.employID, response.email, response.schoolName);
                  break;
                case 'Engineer':
                    newEmployee = new Engineer(response.name, response.employID, response.email, response.github);
                    break;
                default:
                  newEmployee = new Employee(response.name, response.employID, response.email)
              }
              employees.push(newEmployee);
              loopFunction();
        });
    } catch (error) {
        console.log('AN ERROR OCCURED WHILE BUILDING TEAM: ' + error)
    }
}

function initBuilder() {
    inquirer.prompt(
        [
            {
                name: 'nextEmployee',
                type: 'confirm',
                default: true,
                message: 'Would you like to add an employee to the team?'
            }
        ]
    ).then(function (response) {
        if (response.nextEmployee)
        employeeBuilder(initBuilder);
    })
}

initBuilder();