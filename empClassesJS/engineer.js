const Employee = require('./employee');
class Engineer extends Employee {
    constructor(name, ID, email, gitHub) {
        super(name, ID, email)
        this.gitHub = gitHub;
    }
    getGithub() {
        return this.gitHub;
    }

    getPos() {
        return 'Engineer'
    }
}
module.exports = Engineer;