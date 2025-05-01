const express = require('express');
const { createProject , getProjects } = require('../controllers/projectController');
const { authenticateRoute } = require('../middleware/authenticate');
const router = express.Router();

router.post('/create-project', authenticateRoute, createProject);

router.get('/',getProjects);

module.exports = router;
