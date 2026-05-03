import React from 'react';

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Personalized Diet Plan Generator</h1>
        <p className="text-xl mb-8">Get customized diet recommendations based on your body metrics and health goals</p>
        <button 
          onClick={() => document.getElementById('diet-form')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;
