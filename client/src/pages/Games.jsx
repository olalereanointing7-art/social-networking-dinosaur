import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserStore } from '../store/userStore';
import GameCard from '../components/GameCard';
import { FaGamepad, FaSpinner } from 'react-icons/fa';

function Games() {
  const [games, setGames] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const { token } = useUserStore();

  useEffect(() => {
    fetchGames();
  }, [category]);

  const fetchGames = async () => {
    setLoading(true);
    try {
      const url = category === 'all' ? '/api/games' : `/api/games/category/${category}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGames(response.data);
    } catch (err) {
      console.error('Error fetching games:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'sports', 'cards', 'racing', 'puzzle', 'strategy'];

  return (
    <div className="container mx-auto py-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <FaGamepad /> Games
        </h1>

        <div className="flex gap-2 mb-6 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                category === cat
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-10">
            <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto" />
          </div>
        ) : games.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p>No games available in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {games.map((game) => (
              <GameCard key={game._id} game={game} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Games;