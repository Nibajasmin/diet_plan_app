import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-green-600">
            🍎 DietPlan Pro
          </Link>
          <div className="space-x-4">
            <Link to="/" className="text-gray-700 hover:text-green-600">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-green-600">About</Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-green-600">Dashboard</Link>
            <Link to="/contact" className="text-gray-700 hover:text-green-600">Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
