const fs = require('fs')
const inquirer = require('inquirer')
const jest = require('jest')
const Engineer = require('./empClasses/engineer');
const Manager = require('./empClasses/manager');
const Intern = require('./empClasses/intern');

function buildProfile() {
    inquirer.prompt([{
        name: 'ManagerName',
        type: 'input',
        message: 'Please Enter the Team Managers name.'
    },{
        name: 'employeeID',
        type:'input',
        message: 'Please enter your employee ID number'
    },{
        name: 'ManagerEmail',
        type: 'input',
        message: 'Please enter the managers email address.',
    },{
        name:'offNum',
        type: 'input',
        message: 'Please enter your office number.',
    }])
    .then(function(response) {
     inquirer.prompt([{
         name: 'addMember',
         type: 'list',
         message: 'Choose new team member role',
         choices: ['engineer', 'intern']
     }])
     if (response.addMember === 'engineer') {
         inquirer.prompt([{
             name: 'name',
             type: 'input',
             message: 'please enter the engineers name',
         },{
             name:'email',
             type:'input',
             message:'Please enter engineer email address.'
         },{
             name:'github',
             type: 'input',
             message:'Please enter Github Username.'
         }]);
        } else if (response.addMember === 'intern') {
            inquirer.prompt([{
                name:'name',
                type:'input',
                message:'Please enter Intern name.'
            },{
                name:'email',
                type:'input',
                message:'Please enter intern email.'
            },{
                name:'ID',
                type:'input',
                message:'Please Enter Intern ID'
            },{
                name:'school',
                type:'input',
                message:'Please Enter the school you attended'
            }])
        }
    }    
    
}
