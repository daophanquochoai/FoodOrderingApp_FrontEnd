import React, { useState } from 'react';

interface PointProps {
  userPoints: number;
  onUsePoints: (pointsToUse: number) => void;
}

const Point: React.FC<PointProps> = ({ userPoints, onUsePoints }) => {
  const [isUsingPoints, setIsUsingPoints] = useState(false);

  // Minimum and maximum points
  const POINTS_LIMIT = 1000;
  
  // Only show if user has enough points
  if (userPoints < POINTS_LIMIT) return null;

  // Toggle points usage
  const handleTogglePoints = () => {
    const newState = !isUsingPoints;
    setIsUsingPoints(newState);
    
    // Apply or remove points
    if (newState) {
      onUsePoints(POINTS_LIMIT);
    } else {
      onUsePoints(0);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <strong className="text-lg">Loyalty Points</strong>
      <div className="p-4 border rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-medium">Your Available Points</p>
            <p className="text-xl font-semibold text-blue-600">{userPoints.toLocaleString()} points</p>
            <p className="text-sm text-gray-500">
              Use 1,000 points to get $1.00 off
            </p>
          </div>
          <div className="flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox"
                className="sr-only peer"
                checked={isUsingPoints}
                onChange={handleTogglePoints}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">
                Use 1,000 Points
              </span>
            </label>
          </div>
        </div>
        
        {isUsingPoints && (
          <div className="mt-4 bg-blue-50 p-3 rounded-md border border-blue-100">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="font-medium">Using 1,000 points</span>
                <p className="text-gray-600 text-xs mt-1">Maximum limit per transaction</p>
              </div>
              <span className="text-blue-600 font-medium">-$1.00</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Point;