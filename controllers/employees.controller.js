const Employee = require('../models/employee.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Employee.find().populate('department'));
    }
      catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Employee.countDocuments();
        const rand = Math.floor(Math.random()* count);
        const emp = await Employee.findOne().populate('department').skip(rand);
        if(!emp) res.status(404).json({ message : 'Not found' });
        else res.json(emp);
    }
  
      catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getId = async (req, res) => {
    try {
        const emp = await Employee.findById(req.params.id).populate('department');
        if(!emp) res.status(404).json({ message: 'Not found' });
        else res.json(emp);
    }
  
      catch(err) {
        res.status(500).json({ message: err });
    };
};

exports.post = async (req, res) => {
    const { firstName, lastName, department } = req.body;

    try {
        const newEmployee = new Employee({ firstName, lastName, department });
        await newEmployee.save();
        res.json({ message: 'OK' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.putId = async (req, res) => {
    const { firstName, lastName, department } = req.body;

    try {
        const emp = await Employee.findById(req.params.id);
        if (emp) {
            emp.firstName = firstName;
            emp.lastName = lastName;
            emp.department = department;
            await emp.save();
            res.json({ message: 'OK' });
        } else res.status(404).json({ message: 'Not found' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteId = async (req, res) => {
    try {
        const emp = await Employee.findById(req.params.id);
        if(emp) {
          await Employee.deleteOne({ _id: req.params.id });
          res.json({ message: 'OK' });
        } 
        else res.status(404).json({ message: 'Not found...' });
    }
  
      catch(err){
        res.status(500).json({ message: err });
    }
};

