const mongoose = require('mongoose');

const workspaceSchema = new mongoose.Schema({
    logo: String,
    name: {                              // workspace => employee
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: String,
    password: String,
    address: String,
    active: {
        type: Boolean,
        required: false,
        default: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Workspace', workspaceSchema);
