import React from 'react';

const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center space-y-4">
        {/* Rainbow Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full bg-white"></div>
        </div>
        {/* Loading Text with Rainbow Colors */}
        <div className="text-2xl font-bold">
          <span className="text-red-500">L</span>
          <span className="text-orange-500">o</span>
          <span className="text-yellow-500">a</span>
          <span className="text-green-500">d</span>
          <span className="text-blue-500">i</span>
          <span className="text-indigo-500">n</span>
          <span className="text-purple-500">g</span>
          <span className="text-pink-500">.</span>
          <span className="text-red-500">.</span>
          <span className="text-orange-500">.</span>
        </div>
        {/* Pride Message */}
        <p className="text-gray-600 text-center max-w-xs">
          Celebrating diversity and love for all. 🌈
        </p>
      </div>
    </div>
  );
};

export default Preloader;