const express = require('express');
const employeeController = require('../controllers/employeeController');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');


router.use(authMiddleware);
router.use(roleMiddleware(['superadmin', 'workspaceadmin', 'employee']));


router.get('/profile/:id', employeeController.viewUserProfile);

module.exports = router;