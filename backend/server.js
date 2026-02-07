const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Job = require('./models/job');  // Import the Job model

const app = express();
const port = 5000;

// Enable CORS (Cross-Origin Resource Sharing) for frontend requests
app.use(cors());

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// MongoDB connection string (you can replace this with your own MongoDB URI)
const mongoURI = 'mongodb://localhost:27017/jobdb'; // Use MongoDB Atlas URL for cloud database

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log('MongoDB connection error:', err));

// Create job API endpoint
app.post('/api/jobs', (req, res) => {
    const { title, company, logo, location, type, description, minSalary, maxSalary } = req.body;

    // Create a new Job using the Job model
    const newJob = new Job({
        title,
        company,
        logo,
        location,
        type,
        description,
        minSalary,
        maxSalary
        
    });

    // Save the job to MongoDB
    newJob.save()
        .then(job => {
            res.status(201).json(job);
        })
        .catch(err => {
            res.status(400).json({ error: err.message });
        });
});

// Get all jobs API endpoint
app.get('/api/jobs', (req, res) => {
    Job.find()
        .then(jobs => {
            res.json(jobs);
        })
        .catch(err => {
            res.status(400).json({ error: err.message });
        });
});

// Delete job API endpoint
app.delete('/api/jobs/:id', (req, res) => {
    const { id } = req.params;

    Job.findByIdAndDelete(id)
        .then(deletedJob => {
            if (deletedJob) {
                res.json({ message: `Job with id ${id} deleted successfully.` });
            } else {
                res.status(404).json({ message: `Job with id ${id} not found.` });
            }
        })
        .catch(err => {
            res.status(400).json({ error: err.message });
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
