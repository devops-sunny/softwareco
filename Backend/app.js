const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const superAdminRoutes = require('./routes/superAdminRoutes');
const workspaceAdminRoutes = require('./routes/workspaceAdminRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const connectDB = require('./db/database');
const cors = require('cors');

dotenv.config();
connectDB();

dotenv.config();

const app = express();

app.use(cors());
app.options('*', cors())

app.use('/uploads', express.static('uploads'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/superadmin', superAdminRoutes);
app.use('/api/workspaceadmin', workspaceAdminRoutes);
app.use('/api/employee', employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});