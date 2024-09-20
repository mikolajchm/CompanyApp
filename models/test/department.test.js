const Department = require('../department.model.js');
const expect = require('chai').expect;


describe('Department', () => {

    it('should throw an error if no "name" arg', async () => {
        const dep = new Department({}); // create new Department, but don't set `name` attr value
    
      dep.validateSync(err => {
        expect(err.errors.name).to.exist;
      });
    
    });

    it('should throw an error if "name" is not a string', () => {

        const cases = [{}, []];
        for(let name of cases) {
          const dep = new Department({ name });
      
          dep.validateSync(err => {
            expect(err.errors.name).to.exist;
          });
      
        }
      
    });

    it('should throw an error if "name" is less than 5 characters or more than 20 ', () => {

        const cases = ['ABC', 'A', 'ABCDEFGHIJKLMNOP'];
        for(let name of cases) {
          const dep = new Department({ name });
      
          dep.validateSync(err => {
            expect(err.errors.name).to.exist;
          });
      
        }
      
    });

    it('should throw an name if "name" is a correct value', () => {

        const cases = ['Lorem ipsum', 'DepartamentA'];
        for(let name of cases) {
          const dep = new Department({ name });
      
          dep.validateSync(err => {
            expect(err).to.not.exist;
          });
      
        }
      
    });  
});
