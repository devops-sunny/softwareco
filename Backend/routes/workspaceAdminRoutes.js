const express = require('express');
const workspaceAdminController = require('../controllers/workspaceAdminController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');


const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(['superadmin', 'workspaceadmin']));

router.get('/data', workspaceAdminController.EmployeespaceData);

router.get('/viewWorkspaceData', workspaceAdminController.viewWorkspaceData);

router.delete('/employees/:id', workspaceAdminController.deactivateEmployee);

router.get('/profile/:id', workspaceAdminController.viewProfile);

router.get('/employees/:id/bypass', workspaceAdminController.bypassEmployeeLogin);

router.get('/export-employees', workspaceAdminController.exportEmployees);

router.post('/employees', workspaceAdminController.addEmployee);

router.put('/employees/:id', workspaceAdminController.editEmployee);


module.exports = router;