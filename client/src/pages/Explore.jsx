import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserStore } from '../store/userStore';
import { FaSearch, FaSpinner } from 'react-icons/fa';

function Explore() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useUserStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get(`/api/users/search/${search}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (err) {
      console.error('Error searching users:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex items-center bg-white rounded-lg shadow-md p-3">
            <FaSearch className="text-gray-400 mr-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for users..."
              className="w-full outline-none"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Search
            </button>
          </div>
        </form>

        {loading ? (
          <div className="text-center py-10">
            <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto" />
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p>No users found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {users.map((user) => (
              <div key={user._id} className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <img src={user.profilePicture || 'https://via.placeholder.com/50'} alt={user.username} className="w-12 h-12 rounded-full mr-3 object-cover" />
                  <div>
                    <h3 className="font-semibold">{user.username}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
                <a href={`/profile/${user._id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  View Profile
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Explore;