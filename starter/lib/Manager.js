// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
/// Manager.js
import Employee from './Employee.js';

export default class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getRole() {
        return 'Manager';
    }

    getOffice() {
        return this.officeNumber;
    }
}