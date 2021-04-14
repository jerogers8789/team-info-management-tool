const Employee = require('./employee');

class Manager extends Employee {
    constructor(name, ID, email, officeNum) {
        super (name, ID, email);
        this.officeNum = officeNum;
    }
    getOfficenum() {
        return this.officeNum;
    }

    getPos() {
        return 'Manager';
    }
}
module.exports = Manager;