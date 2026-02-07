function LoadingState() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1,2,3].map(i => (
          <div key={i} className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-48"></div>
        ))}
      </div>
    );
  }
  
  export default LoadingState;