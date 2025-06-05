import React from 'react';

const TopBar = () => {
  return (
    <div className="bg-white shadow-sm p-4 flex justify-between items-center">
      {/* Search Bar */}
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Icons and User Profile */}
      <div className="flex items-center space-x-4">
        {/* Notification Bell */}
        <button className="text-gray-600 hover:text-gray-800">
          <span className="text-xl">[bell]</span>
        </button>

        {/* User Profile */}
        <div className="flex items-center">
          <span className="mr-2 text-gray-600">[avatar]</span>
          <span className="text-gray-800">Admin User</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
