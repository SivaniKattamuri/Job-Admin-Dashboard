import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSearch,
  faMapMarkerAlt,
  faDollarSign,
  faBriefcase,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import JobManagementDashboard from './components/job-management/JobManagementDashboard';

// Add Font Awesome icons to library
library.add(
  faSearch,
  faMapMarkerAlt,
  faDollarSign,
  faBriefcase,
  faTimes
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto">
            <h1 className="text-xl font-bold">Job Management System</h1>
          </div>
        </nav>

        <main className="container mx-auto py-4">
          <Routes>
            <Route path="/" element={<JobManagementDashboard />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white p-4 mt-8">
          <div className="container mx-auto text-center">
            <p>&copy; 2025 Job Management System</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
