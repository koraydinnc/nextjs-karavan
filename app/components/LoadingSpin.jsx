import React from 'react';

const LoadingSpin = () => {
  return (
    <div className="flex items-center justify-center min-h-44 top-0 mb-40">
      <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full flex items-center top-0 animate-spin"></div>
    </div>
  );
};

export default LoadingSpin;
