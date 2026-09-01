import React from 'react';
import { FaEye, FaGift } from 'react-icons/fa';

function StreamCard({ stream }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="relative bg-gray-300 h-40">
        <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          LIVE
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{stream.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{stream.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <FaEye /> {stream.viewCount} viewers
          </span>
          <span className="flex items-center gap-1">
            <FaGift /> {stream.gifts?.length || 0} gifts
          </span>
        </div>
        <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 font-semibold">
          Watch Stream
        </button>
      </div>
    </div>
  );
}

export default StreamCard;