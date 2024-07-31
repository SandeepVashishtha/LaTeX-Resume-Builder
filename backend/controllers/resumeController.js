// backend/controllers/resumeController.js
exports.fetchResumes = async (req, res) => {
    try {
      // Fetch resumes from the database
      const resumes = await ResumeModel.find(); // Adjust according to your model
      res.json(resumes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching resumes' });
    }
  };
  