const fs = require('fs')
const inquirer = require('inquirer')
const jest = require('jest')
const Engineer = require('./empClasses/engineer');
const Manager = require('./empClasses/manager');
const Intern = require('./empClasses/intern');

function Employee(name, ID, email){
    this.name = name;
    this.ID = ID;
    this.email = email;
}

class Manager extends Employee {
 constructor(officeNum) {
     this.officeNum = officeNum;
 }
}
class Engineer extends Employee {
    constructor(gitHub) {
        this.gitHub = gitHub;
    }
}
class Intern extends Employee {
    constructor(school) {
        this.school = school;
    }
}
function buildProfile(response) {
inquirer.prompt([{
    name: 'name',
    type: 'input',
    message: 'Enter employee name'
},{
    name: 'ID',
    type: 'input',
    message: 'Enter employee ID'
},{
    name: 'email',
    type: 'input',
    message: 'Enter employee email'
},{
    name: 'role',
    type: 'list',
    message: 'Please select employee role',
    choices: ['Manager', 'Engineer', 'Intern',]
}]);
 if (inquirer.prompt(role.response) === Manager) {  
     inquirer.prompt([{
         name: 'officeNum',
         type: 'input',
         message: 'Please Enter Manager office number.'
     }]);
 } else if (inquirer.prompt(role.response) === Engineer) {
     inquirer.prompt([{
         name: 'gitHub',
         type: 'input',
         message: 'Please Enter Engineer Github username.'
     }]);
 } else if (inquirer.prompt(role.response)=== Intern) {
     inquirer.prompt([{
         name: 'school',
         type:'input',
         message:'Please Enter the name of the school attended.'
     }]);
 }
}
    
buildProfile();
