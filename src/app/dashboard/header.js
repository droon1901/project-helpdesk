import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Header = ({ title, subtitle, onIconClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Lakukan sesuatu dengan searchQuery (misalnya filter data)
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="bg-gray-800 p-4 shadow-md text-white w-full ml-0">
      <div className="flex justify-between items-center w-full">
        {/* Kiri: Input pencarian dengan icon */}
        <div className="flex items-center space-x-2 flex-grow sm:w-auto">
          <form onSubmit={handleSearchSubmit} className="flex items-center bg-gray-800 p-1 rounded-md w-32 md:w-40">
            <FaSearch className="w-4 h-4 text-white mr-2" /> {/* Ikon di dalam input */}
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="bg-gray-800 text-white p-0.5 rounded-md focus:outline-none w-full text-sm"
            />
          </form>
        </div>

        {/* Kanan: Notifikasi + Welcome User */}
        <div className="flex items-center space-x-6">
          {/* Welcome User */}
          <div>
            <p className="text-sm hidden md:block">Welcome, <span className="font-bold">User</span></p>
          </div>

          {/* Notifikasi */}
          <div className="relative cursor-pointer group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white group-hover:text-blue-500 transition-colors"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m1 0v1a3 3 0 006 0v-1m-7 0h6"
              />
            </svg>

            {/* Indikator Pesan */}
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>

            {/* Tooltip saat hover */}
            <div className="absolute right-0 mt-2 w-40 bg-gray-800 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity p-2">
              You have 3 new notifications!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
