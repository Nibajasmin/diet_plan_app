import React from 'react';

const DietPlan = ({ plan, onReset }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-8">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 -m-6 p-6 rounded-t-lg mb-6">
        <h2 className="text-2xl font-bold text-white">Your Personalized Diet Plan</h2>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{plan.daily_calories}</div>
          <div className="text-gray-600">Daily Calories</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{plan.nutrition?.protein}g</div>
          <div className="text-gray-600">Protein</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">{plan.nutrition?.carbs}g</div>
          <div className="text-gray-600">Carbs</div>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-4">Recommended Foods</h3>
        <ul className="space-y-2">
          {plan.recommended_foods?.map((food, idx) => (
            <li key={idx} className="p-3 bg-gray-50 rounded-lg">{food}</li>
          ))}
        </ul>
      </div>
      
      <button onClick={onReset}
              className="mt-6 px-6 py-2 text-gray-600 hover:text-gray-800 transition">
        ← Generate New Plan
      </button>
    </div>
  );
};

export default DietPlan;
