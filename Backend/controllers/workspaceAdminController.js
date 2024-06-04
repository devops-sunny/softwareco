const Employee = require('../models/Employee');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const Workspace = require('../models/Workspace');
const { Parser } = require('json2csv');


const transformData = (employees) => {
    return employees.map(employee => ({
        name: employee.name || '',
        email: employee.email || '',
        phone: employee.phone || '',
        address: employee.address || '',
        companyName: employee.companyName || '',
        companyAddress: employee.companyAddress || '',
        experience: employee.experience || '',
        department: employee.department || '',
        joiningDate: employee.joiningDate || '',
        workspace: employee.workspace || '',
        active: employee.active ? 'true' : 'false'
    }));
};


exports.exportEmployees = (req, res) => {
    Employee.find({}, (err, employees) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching employees' });
        }

        const transformedData = transformData(employees);

        const json2csvParser = new Parser();
        const csvData = json2csvParser.parse(transformedData);

        res.header('Content-Type', 'text/csv');
        res.attachment('employees.csv');
        return res.send(csvData);
    });
};


exports.EmployeespaceData = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.viewWorkspaceData = async (req, res) => {
    try {
        const employees = await Workspace.find();
        res.json(employees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.addEmployee = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, address, companyName, companyAddress, experience, department, joiningDate  ,active ,workspace} = req.body;

    try {
        let employee = await Employee.findOne({ email });
        if (employee) {
            return res.status(400).json({ message: 'Employee already exists' });
        }

        employee = new Employee({
            name,
            email,
            phone,
            address,
            companyName,
            companyAddress,
            experience,
            department,
            joiningDate,
            active,
            workspace
        });


        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }else{
            user = new User({
                name:name,
                email:email,
                password :"12345678",
                role :"employee",
                company:companyName,
                dob :"",
                department :"",
                mobile :phone,
                profilePicture :"https://www.softwareco.com/wp-content/uploads/2020/09/logo.png",
                joiningDate:joiningDate,
                address:address,
                companyAddress:companyAddress,
                experience:experience
            });

            await user.save();

        }

        


        await employee.save();

        res.json(employee);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.editEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address, companyName, companyAddress, experience, department, joiningDate ,active ,workspace} = req.body;

    try {
        let employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        employee.name = name || employee.name;
        employee.email = email || employee.email;
        employee.phone = phone || employee.phone;
        employee.address = address || employee.address;
        employee.companyName = companyName || employee.companyName;
        employee.companyAddress = companyAddress || employee.companyAddress;
        employee.experience = experience || employee.experience;
        employee.department = department || employee.department;
        employee.joiningDate = joiningDate || employee.joiningDate;
        employee.active = active || employee.active
        employee.workspace = workspace || employee.workspace

        
        await employee.save();

        res.json(employee);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deactivateEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        let employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        employee.active = false;

        await employee.save();

        res.json({ message: 'Employee deactivated' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.bypassEmployeeLogin = async (req, res) => {
    const { id } = req.params;

    try {
        let employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json(employee);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.viewProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const workspaceAdmin = await User.findById(id).select('-password');
        res.json(workspaceAdmin);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
