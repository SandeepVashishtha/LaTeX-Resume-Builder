// backend/routes/resumeRoutes.js
const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const ResumeController = require('../controllers/resumeController');
const authenticate = require('../middleware/authenticate'); // Assuming you have authentication middleware

router.get('/resumes', ResumeController.fetchResumes); // Make sure this route exists

// Create a new resume
router.post('/', authenticate, async (req, res) => {
  try {
    const resume = new Resume({ ...req.body, userId: req.user.id });
    await resume.save();
    res.status(201).json(resume);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get resumes for a user
router.get('/', authenticate, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id });
    res.status(200).json(resumes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
