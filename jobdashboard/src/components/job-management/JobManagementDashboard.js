import React, { useState, useEffect } from 'react';
import JobCard from './components/JobCard';
import axios from 'axios';
import FilterSection from './components/FilterSection';
import CreateJobModal from './components/CreateJobModal';
import LoadingState from './components/LoadingState';
import EmptyState from './components/EmptyState';
import Notification from './components/Notification';

function JobManagementDashboard() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [filters, setFilters] = useState({
        salary: [0, 200000],
        location: '',
        type: 'all'
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [notification, setNotification] = useState(null);
    const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote'];
    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/jobs'); // Replace with your API endpoint
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const handleJobCreation = (newJob) => {
        const updatedJobs = [...jobs, newJob];
        setJobs(updatedJobs);
        setFilteredJobs(updatedJobs.filter(job => {
            const matchesSalary = job.salary >= filters.salary[0] && job.salary <= filters.salary[1];
            const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
            const matchesType = filters.type === 'all' || job.type === filters.type;
            const matchesSearch = !searchQuery ||
                job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.company.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSalary && matchesLocation && matchesType && matchesSearch;
        }));
        setShowCreateModal(false);
        setNotification('Job created successfully!');
    };

    useEffect(() => {
        const filteredJobs = jobs.filter(job => {
            const matchesSalary = job.maxSalary >= filters.salary[0] && job.maxSalary <= filters.salary[1];
            const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
            const matchesType = filters.type === 'all' || job.type === filters.type;
            const matchesSearch = !searchQuery ||
                job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.company.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSalary && matchesLocation && matchesType && matchesSearch;
        });
        setFilteredJobs(filteredJobs);
    }, [jobs, filters, searchQuery]);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 p-4 md:p-8">
            <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
                    Job Management
                </h1>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-gray-900 dark:bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 font-inter"
                >
                    Create Job
                </button>
            </header>

            {notification && (
                <Notification
                    message={notification}
                    type="success"
                    onClose={() => setNotification(null)}
                />
            )}

            <div className="mb-8 space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                        <svg
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Salary Range</label>
                        <input
                            type="range"
                            min="0"
                            max="200000"
                            step="10000"
                            value={filters.salary[1]}
                            onChange={(e) => setFilters({ ...filters, salary: [0, parseInt(e.target.value)] })}
                            className="w-full"
                        />
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                            Up to ${filters.salary[1].toLocaleString()}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Location</label>
                        <input
                            type="text"
                            placeholder="Enter location"
                            value={filters.location}
                            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Job Type</label>
                        <select
                            value={filters.type}
                            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                        >
                            <option value="all">All Types</option>
                            {jobTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            {console.log("filtered-jobs:", filteredJobs)}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-48"></div>
                    ))}
                </div>


            ) : filteredJobs.length === 0 ? (
                <div className="text-center py-12">
                    <i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No jobs found</h3>
                    <p className="text-gray-700 dark:text-gray-300">Try adjusting your filters or search terms</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredJobs.map(job => (
                        <div key={job.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <img src={job.logo} alt={`${job.company} logo`} className="w-12 h-12 rounded-lg mr-4" />
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">{job.title}</h3>
                                    <p className="text-gray-700 dark:text-gray-300">{job.company}</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <i className="fas fa-map-marker-alt text-gray-400 mr-2"></i>
                                    <span className="text-gray-700 dark:text-gray-300">{job.location}</span>
                                </div>
                                <div className="flex items-center">
                                    <i className="fas fa-dollar-sign text-gray-400 mr-2"></i>
                                    <span className="text-gray-700 dark:text-gray-300">${job.maxSalary.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center">
                                    <i className="fas fa-briefcase text-gray-400 mr-2"></i>
                                    <span className="text-gray-700 dark:text-gray-300">{job.type}</span>
                                </div>
                            </div>
                            {/* Job Description Section */}
                            <div className="mt-4">
                                <h4 className="font-semibold text-gray-900 dark:text-white">Job Description:</h4>
                                <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                                    {job.description}
                                </p>
                            </div>
                            {/* Apply Now Button */}
                            <button
                                // onClick={() => handleApplyNow(job.id)}
                                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                            >
                                Apply Now
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {showCreateModal && (
                <CreateJobModal
                    onClose={() => setShowCreateModal(false)}
                    onSubmit={handleJobCreation}
                />
            )}

            {/* {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredJobs.map(job => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            ) : null
            } */}
        </div>
    );
}


export default JobManagementDashboard;
