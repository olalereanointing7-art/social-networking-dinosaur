import React, { useState } from 'react';
import axios from 'axios';
import { useUserStore } from '../store/userStore';
import { FaUsers, FaPlay } from 'react-icons/fa';

function GameCard({ game }) {
  const [joined, setJoined] = useState(false);
  const { user, token } = useUserStore();

  const handleJoin = async () => {
    try {
      await axios.post(
        `/api/games/${game._id}/join`,
        { userId: user?.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setJoined(true);
    } catch (err) {
      console.error('Error joining game:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <img src={game.thumbnail || 'https://via.placeholder.com/300x150'} alt={game.name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{game.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{game.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="bg-gray-200 px-2 py-1 rounded text-xs">{game.category}</span>
          <span className="flex items-center gap-1">
            <FaUsers /> {game.players?.length || 0} playing
          </span>
        </div>
        <button
          onClick={handleJoin}
          disabled={joined}
          className={`w-full py-2 rounded font-semibold flex items-center justify-center gap-2 ${
            joined
              ? 'bg-gray-300 text-gray-600'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          <FaPlay /> {joined ? 'Playing' : 'Play Game'}
        </button>
      </div>
    </div>
  );
}

export default GameCard;