const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware'); 


router.post('/register', upload.single('profilePicture'), authController.registerEmployee);
router.post('/login', authController.loginEmployee);


module.exports = router;