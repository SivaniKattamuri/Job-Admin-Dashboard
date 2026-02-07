// models/job.js
const mongoose = require('mongoose');

// Define the job schema
const jobSchema = new mongoose.Schema({
    title: String,
    company: String,
    logo: String,
    location: String,
    type: String,
    description: String,
    minSalary: Number,
    maxSalary: Number,
    
});

// Create a Job model from the schema
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
