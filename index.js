const fs = require('fs')
const inquirer = require('inquirer')
const jest = require('jest')
const Employee = require('./empClassesJS/employee.js'); 
const Engineer = require('./empClassesJS/engineer.js');
const Manager = require('./empClassesJS/manager.js');
const Intern = require('./empClassesJS/intern.js');

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
        process.on('unhandledRejection', function(reason, promise){
            console.log(promise)
        })
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
        if (response.nextEmployee) {
        employeeBuilder(initBuilder);
    } else {
        console.log(employees);
        buildTeam();
    }})
}

function buildTeam() {    
    startHTML()
    enterHTML();
    endHTML();
}
    
function startHTML(){
    const data = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" />
        <link rel="stylesheet" href="./style/styles.css"/>
        <title>Team Builder</title>
    </head>
    <body>
        <div class="title">
          <h2>Team Profile</h2>
        </div>
        <div class="content">  
        <div class="outer">
        <div class="box">
        <div class="heading">`

        fs.writeFile('index.html', data, (err)=>{
            err ? console.log(err) : console.log('success')
        });
    }

function enterHTML(){
    let data = ''
    employees.forEach(function(employee){
        if (employee.getPos() === 'Manager'){
            data += `<div class="card employee-card">
            <div class="card-header">
                <h2 class="card-title">${employee.name}</h2>
                <h3 class="card-title"><${employee.getPos()}</h3>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item">ID:${employee.ID}</li>
                    <li class="list-group-item">Email: <a href="mailto:${employee.email}">${employee.email}</a></li>
                    <li class="list-group-item">Office number:${employee.officeNum}</li>
                </ul>
            </div>
        </div>`
        } else if (employee.getPos()=== 'Engineer'){
            data +=
            `<div class="card employee-card">
    <div class="card-header">
        <h2 class="card-title">${employee.name}</h2>
        <h3 class="card-title">${employee.getPos()}</h3>
    </div>
    <div class="card-body">
        <ul class="list-group">
            <li class="list-group-item">ID:${employee.ID}</li>
            <li class="list-group-item">Email: <a href="mailto:${employee.email}">${employee.email}</a></li>
            <li class="list-group-item">GitHub: <a href="https://github.com/${employee.gitHub}" target="_blank"
                    rel="noopener noreferrer"></a>${employee.gitHub}</li>
        </ul>
    </div>
</div>`
        } else {
            data +=
            `<div class="card employee-card">
            <div class="card-header">
                <h2 class="card-title">${employee.name}</h2>
                <h3 class="card-title">${employee.getPos()}</h3>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item">ID:${employee.ID}</li>
                    <li class="list-group-item">Email: <a href="mailto:${employee.email}">${employee.email}</a></li>
                    <li class="list-group-item">School:${employee.school}</li>
                </ul>
            </div>
        </div>`
        }
    })
    fs.appendFile("index.html", data, function (error) {
        error ? console.error(error) : console.log('success!')
    })
}

function endHTML(){
    data = 
    `</div>
    </body>
    </html>
        `
        fs.writeFile('index.html', data, (err)=>{
            err ? console.log(err) : console.log('success')
        });
}
initBuilder();