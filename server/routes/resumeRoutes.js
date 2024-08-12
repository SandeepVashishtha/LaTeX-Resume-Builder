const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');

router.post('/save', resumeController.saveResume);
router.get('/get/latest', resumeController.getResume);

module.exports = router;
