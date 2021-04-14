const Employee = require('./employee');

class Intern extends Employee {
    constructor(name, ID, email, school) {
        super (name, ID, email);
        this.school = school;
    }
    getSchool() {
        return this.school;
    }
    getPos() {
        return 'Intern';
    }
}
module.exports = Intern;