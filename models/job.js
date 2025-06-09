const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'internship', 'contract'],
    default: 'full-time'
  },
  salaryRange: {
    type: String,
    required: true
  },
  skillsRequired: {
    type: [String], // e.g. ['JavaScript', 'Node.js']
    required: true
  },
  // postedBy: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User', // posted by employer
  //   required: true
  // },
  lastDateToApply: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', jobSchema);