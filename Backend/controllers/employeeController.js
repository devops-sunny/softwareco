const Employee = require('../models/Employee');
const User = require('../models/User');

exports.viewUserProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const Users= await User.findById(id).select('-password');
        if (!Users) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(Users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

