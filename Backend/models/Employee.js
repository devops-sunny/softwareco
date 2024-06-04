const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: String,
    address: String,
    companyName: String,  
    companyAddress: String,
    experience: String,
    department: String,
    joiningDate: String,
    workspace: String,
    active: {
        type: Boolean,
        required: false,
        default: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
