// SkeletonCard.js
import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-gray-700 animate-pulse rounded-lg shadow-lg p-4">
      <div className="h-48 bg-gray-600 rounded mb-4"></div>
      <div className="h-6 bg-gray-600 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-600 rounded w-1/2"></div>
    </div>
  );
};

export default SkeletonCard;
