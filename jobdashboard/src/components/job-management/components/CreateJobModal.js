import React, { useState, useEffect } from 'react';
import axios from 'axios';
function CreateJobModal({ onClose, onSubmit }) {
    const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote'];
    const initialFormState = {
        title: '',
        company: '',
        logo: '',
        location: '',
        type: '',
        minSalary: '',
        maxSalary: '',
        description: '',
    };

    const [formData, setFormData] = useState(initialFormState);
    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        if (!formData.title) errors.title = 'Job title is required';
        if (!formData.company) errors.company = 'Company name is required';
        if (!formData.location) errors.location = 'Location is required';
        if (!formData.logo) errors.logo = 'Logo URL is required';
        if (!formData.type) errors.type = 'Job type is required';
        if (!formData.minSalary) errors.minSalary = 'Minimum salary is required';
        if (!formData.maxSalary) errors.maxSalary = 'Maximum salary is required';
        if (!formData.description) errors.description = 'Description is required';
        if (parseInt(formData.minSalary) > parseInt(formData.maxSalary)) {
            errors.minSalary = 'Minimum salary cannot be greater than maximum salary';
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post('http://localhost:5000/api/jobs', formData); // Replace with your API endpoint
                onSubmit(response.data);  // Pass the created job data to the parent component
                setFormData(initialFormState);
                setFormErrors({});
                onClose();
            } catch (error) {
                console.error('Error creating job:', error);
                setFormErrors({ apiError: 'Error creating job. Please try again later.' });
            }
        } else {
            setFormErrors(errors);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create New Job</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Job Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className={`w-full px-4 py-2 border ${formErrors.title ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200`}
                        />
                        {formErrors.title && <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>}
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Company Name *</label>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className={`w-full px-4 py-2 border ${formErrors.company ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200`}
                        />
                        {formErrors.company && <p className="text-red-500 text-sm mt-1">{formErrors.company}</p>}
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Company Logo URL *</label>
                        <input
                            type="text"
                            name="logo"
                            value={formData.logo}
                            onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                            className={`w-full px-4 py-2 border ${formErrors.logo ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200`}
                        />
                        {formErrors.logo && <p className="text-red-500 text-sm mt-1">{formErrors.logo}</p>}
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Location *</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className={`w-full px-4 py-2 border ${formErrors.location ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200`}
                        />
                        {formErrors.location && <p className="text-red-500 text-sm mt-1">{formErrors.location}</p>}
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Job Type *</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className={`w-full px-4 py-2 border ${formErrors.type ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200`}
                        >
                            <option value="">Select a job type</option>
                            {jobTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        {formErrors.type && <p className="text-red-500 text-sm mt-1">{formErrors.type}</p>}
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className={`w-full max-w-full px-4 py-2 border ${formErrors.description ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200`}
                            rows="4" // You can adjust the number of rows for the height

                        />
                        {formErrors.description && <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Minimum Salary *</label>
                            <input
                                type="number"
                                name="minSalary"
                                min="0"
                                value={formData.minSalary}
                                onChange={(e) => setFormData({ ...formData, minSalary: e.target.value })}
                                className={`w-full px-4 py-2 border ${formErrors.minSalary ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200`}
                            />
                            {formErrors.minSalary && <p className="text-red-500 text-sm mt-1">{formErrors.minSalary}</p>}
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Maximum Salary *</label>
                            <input
                                type="number"
                                name="maxSalary"
                                min="0"
                                value={formData.maxSalary}
                                onChange={(e) => setFormData({ ...formData, maxSalary: e.target.value })}
                                className={`w-full px-4 py-2 border ${formErrors.maxSalary ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200`}
                            />
                            {formErrors.maxSalary && <p className="text-red-500 text-sm mt-1">{formErrors.maxSalary}</p>}
                        </div>


                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-700"
                        >
                            Create Job
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-6 py-2 rounded hover:bg-gray-900 hover:text-white dark:hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function StoryComponent() {
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = (formData) => {
        console.log('Form submitted:', formData);
        setIsOpen(false);
    };

    return (
        <div className="p-4">
            <button
                onClick={() => setIsOpen(true)}
                className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-700"
            >
                Open Job Creation Modal
            </button>

            {isOpen && (
                <CreateJobModal
                    onClose={() => setIsOpen(false)}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
}

export default CreateJobModal;
