import React, { useState } from 'react';

const MealCard = ({ meal, index }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-gray-800">{meal.name}</h3>
            <p className="text-sm text-gray-500">{meal.time}</p>
          </div>
          <span className="text-2xl">{meal.icon}</span>
        </div>
      </div>
      {expanded && (
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="space-y-2">
            {meal.items?.map((item, idx) => (
              <div key={idx} className="flex justify-between">
                <span>{item.name}</span>
                <span className="text-gray-500">{item.quantity}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MealCard;
