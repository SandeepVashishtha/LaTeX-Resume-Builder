const Resume = require('../models/resumeModel');

exports.saveResume = async (req, res) => {
  try {
    const { latexCode } = req.body;
    let resume = await Resume.findOne({}); // Save the latest resume

    if (resume) {
      resume.latexCode = latexCode;
      await resume.save();
    } else {
      resume = new Resume({ latexCode });
      await resume.save();
    }

    res.status(200).json({ message: 'Resume saved!', resume });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({});
    res.status(200).json(resume || { latexCode: '' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

