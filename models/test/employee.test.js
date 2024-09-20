const Employee = require('../employee.model.js')
const expect = require('chai').expect;


describe('Employee', () => {

    it('should throw an error if no "firstName, lastName and departament" arg', async () => {
        const dep = new Employee({}); 
    
        dep.validateSync(err => {
            expect(err).to.exist; 
            expect(err.errors.firstName).to.exist; 
            expect(err.errors.lastName).to.exist; 
            expect(err.errors.department).to.exist; 
        });
    
    });

    it('should throw an error if "firstName, lastName, and department" are not strings', () => {
        
        const cases = [
          { firstName: 12, lastName: 123, department: 123 },
          { firstName: 1, lastName: 789, department: 101 }
        ];
      
        for (let data of cases) {
          const { firstName, lastName, department } = data;
          const dep = new Employee({ firstName, lastName, department });
      
            dep.validateSync(err => {
                expect(err).to.exist; 
                expect(err.errors.firstName).to.exist; 
                expect(err.errors.lastName).to.exist; 
                expect(err.errors.department).to.exist; 
            });
        }
    });

    it('should throw an name if "firstName, lastName, and department" is a correct value', () => {

        const cases = [
            { firstName: 'John', lastName: 'Doe', department: 'IT' },
            { firstName: 'Amanda', lastName: 'Doe', department: 'IT' }
          ];
        for(let data of cases) {
          const { firstName, lastName, department } = data;
          const dep =  new Employee({ firstName, lastName, department });
      
          dep.validateSync(err => {
            expect(err).to.exist; 
            expect(err.errors.firstName).to.not.exist; 
            expect(err.errors.lastName).to.not.exist; 
            expect(err.errors.department).to.not.exist; 
          });
      
        }
      
    }); 


  
});
