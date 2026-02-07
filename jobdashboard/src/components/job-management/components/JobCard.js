import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function JobCard({ job }) {
    return (
      <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center mb-4">
          <img src={job.logo} alt={`${job.company} logo`} className="w-12 h-12 rounded-lg mr-4" />
          <div>
            <h3 className="font-bold text-gray-900">{job.title}</h3>
            <p className="text-gray-600">{job.company}</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <FontAwesomeIcon icon="map-marker-alt" className="mr-2" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FontAwesomeIcon icon="dollar-sign" className="mr-2" />
            <span>${job.salary.toLocaleString()}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FontAwesomeIcon icon="briefcase" className="mr-2" />
            <span>{job.type}</span>
          </div>
        </div>
      </div>
    );
  }
  
  export default JobCard;