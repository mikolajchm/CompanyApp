const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');


describe('Employee', () => {

    before(async () => {

        try {
            await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
        } catch(err) {
            console.error(err);
        }
    
    });

    describe('Reading data', () => {
        
        before(async () => {
            const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'Department #1' });
            await testEmpOne.save();
        
            const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Doe', department: 'Department #2' });
            await testEmpTwo.save();
        });

        it('should return all the data with "find" method', async () => {
            const employees = await Employee.find();
            const expectedLength = 2;
            expect(employees.length).to.be.equal(expectedLength);
        });

        it('should return a proper document by "firstName" with "findOne" method', async () => {
            const employee = await Employee.findOne({ firstName: 'John' });
            const expectedName = 'John';
            expect(employee.firstName).to.be.equal(expectedName);
        });

        after(async () => {
            await Employee.deleteMany();
        });

    });


    describe('Creating data', () => {
    
        it('should insert new document with insertOne method', async () => {
            Employee.collection.insertOne({ firstName: 'John', lastName: 'Doe', department: 'IT'});
            const employees = await Employee.find();
            const expectedLength = 1;
            expect(employees.length).to.be.equal(expectedLength);
        });


        after(async () => {
            await Employee.deleteMany();
        });

    });

    describe('Updating data', () => {
    
        before(async () => {
            const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'Department #1' });
            await testEmpOne.save();
        
            const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Doe', department: 'Department #2' });
            await testEmpTwo.save();
        });

        it('should properly update one document with "updateOne" method', async () => {
            await Employee.updateOne({ firstName: 'John' }, { $set: { firstName: 'John2' }});
            const updatedEmployee = await Employee.findOne({ firstName: 'John2' });
            expect(updatedEmployee).to.not.be.null;
        });
      
        it('should properly update one document with "save" method', async () => {
            const employee = await Employee.findOne({ firstName: 'John2' });
            employee.firstName = 'John123';
            await employee.save();
            const updatedEmployee = await Employee.findOne({ firstName: 'John123' });
            expect(updatedEmployee).to.not.be.null;
        });
      
        it('should properly update multiple documents with "updateMany" method', async () => {
            await Employee.updateMany({}, { $set: { firstName: 'Updated!' }});
            const employees = await Employee.find();
            expect(employees[0].firstName).to.be.equal('Updated!');
            expect(employees[1].firstName).to.be.equal('Updated!');
        });

        after(async () => {
            await Employee.deleteMany();
        });

    });

    describe('Removing data', () => {

        before(async () => {
            const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'Department #1' });
            await testEmpOne.save();
        
            const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Doe', department: 'Department #2' });
            await testEmpTwo.save();
        });
          

        it('should properly remove one document with "deleteOne" method', async () => {
            const employee = await Employee.findOne({ firstName: 'John' });
            await employee.deleteOne();
            const employees = await Employee.find();
            expect(employees.length).to.be.equal(1);
        });
      
        it('should properly remove multiple documents with "deleteMany" method', async () => {
            await Employee.deleteMany();
            const employeearray = await Employee.find();
            expect(employeearray).to.not.be.null;
        });

        afterEach(async () => {
            await Employee.deleteMany();
        });
      
        
    });
});
