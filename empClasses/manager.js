const Employee = require('./employee');

class Manager extends Employee {
    constructor(name, ID, email, officeNum) {
        this.officeNum = officeNum;
    }
    getOfficenum() {
        return this.officeNum;
    }

    getPos(){
        return 'Manager';
    }
}
module.exports = Manager;