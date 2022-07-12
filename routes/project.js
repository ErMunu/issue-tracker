const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project_controller');

router.get('/create-project', projectController.projectForm);
router.post('/create-project', projectController.createProject);
router.get('/create-issue/:id', projectController.issueForm);
router.post('/create-issue/:id', projectController.createIssue);
router.get('/:id', projectController.project);


module.exports = router;
