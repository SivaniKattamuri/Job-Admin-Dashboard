import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function FilterSection({ filters, setFilters, searchQuery, setSearchQuery }) {
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote'];

  return (
    <div className="mb-8 space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <FontAwesomeIcon icon="search" className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded bg-white text-gray-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-2">Salary Range</label>
          <input
            type="range"
            min="0"
            max="200000"
            step="10000"
            value={filters.salary[1]}
            onChange={(e) => setFilters({...filters, salary: [0, parseInt(e.target.value)]})}
            className="w-full"
          />
          <div className="text-sm text-gray-600">
            Up to ${filters.salary[1].toLocaleString()}
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">Location</label>
          <input
            type="text"
            placeholder="Enter location"
            value={filters.location}
            onChange={(e) => setFilters({...filters, location: e.target.value})}
            className="w-full px-4 py-2 border border-gray-200 rounded bg-white text-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">Job Type</label>
          <select
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
            className="w-full px-4 py-2 border border-gray-200 rounded bg-white text-gray-700"
          >
            <option value="all">All Types</option>
            {jobTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
    );
}

export default FilterSection;