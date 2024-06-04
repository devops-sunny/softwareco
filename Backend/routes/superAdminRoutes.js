const express = require('express');
const superAdminController = require('../controllers/superAdminController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');


const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(['superadmin']));

router.post('/workspaces', superAdminController.createWorkspace);

router.put('/workspaces/:id', superAdminController.editWorkspace);

router.delete('/workspaces/:id', superAdminController.deactivateWorkspace);


router.get('/employeesworkspaces', superAdminController.employeesworkspaces);



module.exports = router;
