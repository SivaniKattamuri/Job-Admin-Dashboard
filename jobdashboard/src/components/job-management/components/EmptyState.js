function EmptyState() {
    return (
      <div className="text-center py-12">
        <i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No jobs found</h3>
        <p className="text-gray-700 dark:text-gray-300">Try adjusting your filters or search terms</p>
      </div>
    );
  }
  
  export default EmptyState;