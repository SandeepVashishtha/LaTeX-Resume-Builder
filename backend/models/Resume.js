// backend/models/Resume.js
const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  skills: { type: String, required: true }
});

module.exports = mongoose.model('Resume', ResumeSchema);
