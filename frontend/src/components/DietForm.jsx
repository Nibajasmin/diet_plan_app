import React, { useState } from 'react';
import toast from 'react-hot-toast';

const DietForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: 'male',
    activity_level: 'moderate',
    goal: 'weight_loss',
    dietary_preference: 'non_vegetarian',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.age || !formData.weight || !formData.height) {
      toast.error('Please fill all required fields');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div id="diet-form" className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Age *</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} 
                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" required />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Weight (kg) *</label>
            <input type="number" step="0.1" name="weight" value={formData.weight} onChange={handleChange} 
                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" required />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Height (cm) *</label>
            <input type="number" step="0.1" name="height" value={formData.height} onChange={handleChange} 
                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" required />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Activity Level</label>
            <select name="activity_level" value={formData.activity_level} onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500">
              <option value="sedentary">Sedentary</option>
              <option value="light">Light</option>
              <option value="moderate">Moderate</option>
              <option value="active">Active</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Goal</label>
            <select name="goal" value={formData.goal} onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500">
              <option value="weight_loss">Weight Loss</option>
              <option value="weight_gain">Weight Gain</option>
              <option value="maintain">Maintain Weight</option>
            </select>
          </div>
        </div>
        <button type="submit" disabled={loading}
                className="w-full mt-6 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50">
          {loading ? 'Generating...' : 'Generate Diet Plan'}
        </button>
      </form>
    </div>
  );
};

export default DietForm;
