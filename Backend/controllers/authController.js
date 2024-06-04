const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const Employee = require('../models/Employee');

exports.registerEmployee = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password,role, company, dob, department, mobile, joiningDate  ,address,
        companyAddress,
        experience} = req.body;
   
        // const profilePicture = req.file ? `http://localhost:5000/${req.file.path}` : null;
    
     try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password,
            role,
            company,
            dob,
            department,
            mobile,
            profilePicture :"https://www.softwareco.com/wp-content/uploads/2020/09/logo.png",
            joiningDate,
            address,
            companyAddress,
            experience
        });
          

        if(role == "employee" || "workspaceadmin"){
            let employee = await Employee.findOne({ email });
       
            employee = new Employee({
                name :name,
                email : email,
                phone:mobile,
                address:address,
                companyName :company,
                companyAddress:companyAddress,
                experience :experience,
                department:department,
                joiningDate:joiningDate,
                workspace :"",
                active:true
            });
    
            await employee.save();
        }
     

        await user.save();
 
 
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '5d'
        }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.loginEmployee = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role,
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '5d'
        }, (err, token) => {
            if (err) throw err;
            res.json({ token :token ,role: user.role  ,id: user.id});
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
