import React, { useState, useEffect } from 'react';

function MainComponent({ message, type = 'success', onClose }) {
    useEffect(() => {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
  
      return () => clearTimeout(timer);
    }, [onClose]);
  
    return (
      <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg">
        {message}
      </div>
    );
  }
  
  function StoryComponent() {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
  
    return (
      <div className="p-4 space-y-4">
        <div className="space-x-4">
          <button
            onClick={() => setShowSuccess(true)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Show Success Notification
          </button>
          
          <button
            onClick={() => setShowError(true)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Show Error Notification
          </button>
        </div>
  
        {showSuccess && (
          <MainComponent
            message="Operation completed successfully!"
            type="success"
            onClose={() => setShowSuccess(false)}
          />
        )}
  
        {showError && (
          <MainComponent
            message="An error occurred. Please try again."
            type="error"
            onClose={() => setShowError(false)}
          />
        )}
      </div>
    );
  }
  
export default MainComponent;
  