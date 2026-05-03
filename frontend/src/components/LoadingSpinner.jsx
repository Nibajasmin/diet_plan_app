import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 text-center">
        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-700">Generating your diet plan...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
