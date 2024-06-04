const Employee = require('../models/Employee');
const User = require('../models/User');
const Workspace = require('../models/Workspace');
const { validationResult } = require('express-validator');

// workspace curd

exports.createWorkspace = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { logo, name, email, phoneNumber, password, address ,active  } = req.body;

    try {
        let workspace = await Workspace.findOne({ email });
        if (workspace) {
            return res.status(400).json({ message: 'Workspace already exists' });
        }

        workspace = new Workspace({
            logo,
            name,
            email,
            phoneNumber,
            password,
            address,
            active
        });

        await workspace.save();

        res.json(workspace);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.editWorkspace = async (req, res) => {
    const { id } = req.params;

    const { logo, name, email, phoneNumber, address ,active  } = req.body;

    try {
        let workspace = await Workspace.findById(id);
        if (!workspace) {
            return res.status(404).json({ message: 'Workspace not found' });
        }



        workspace.logo = logo || workspace.logo;
        workspace.name = name || workspace.name;
        workspace.email = email || workspace.email;
        workspace.phoneNumber = phoneNumber || workspace.phoneNumber;
        workspace.address = address || workspace.address;
        workspace.active = active || workspace.active;

        
        await workspace.save();

        res.json(workspace);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deactivateWorkspace = async (req, res) => {
    const { id } = req.params;

    try {
        let workspace = await Workspace.findById(id);
        if (!workspace) {
            return res.status(404).json({ message: 'Workspace not found' });
        }

        workspace.active = false;

        await workspace.save();

        res.json({ message: 'Workspace deactivated' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




exports.employeesworkspaces = async (req, res) => {
    try {
        const workspaces = await Workspace.find().lean();
        const workspaceIds = workspaces.map(workspace => workspace._id.toString());

        const employees = await Employee.find({
            workspace: { $in: workspaceIds }
        }).lean();

        const workspaceMap = {};
        workspaces.forEach(workspace => {
            workspaceMap[workspace._id.toString()] = {
                ...workspace,
                profile: []
            };
        });

        employees.forEach(employee => {
            if (employee.workspace && workspaceMap[employee.workspace]) {
                workspaceMap[employee.workspace].profile.push(employee);
            }
        });

        const result = Object.values(workspaceMap);
        res.json(result);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
