import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useUserStore } from '../store/userStore';
import { FaUser, FaFollowingicon, FaHeart, FaSpinner } from 'react-icons/fa';

function Profile() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const { user, token } = useUserStore();

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data);
      setIsFollowing(response.data.followers.some(f => f._id === user?.id));
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    try {
      await axios.post(
        `/api/users/${userId}/follow`,
        { currentUserId: user?.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsFollowing(!isFollowing);
      fetchProfile();
    } catch (err) {
      console.error('Error following user:', err);
    }
  };

  if (loading) {
    return <div className="text-center py-20"><FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto" /></div>;
  }

  return (
    <div className="container mx-auto py-6">
      {profile && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={profile.profilePicture || 'https://via.placeholder.com/100'}
                  alt={profile.username}
                  className="w-24 h-24 rounded-full mr-4 object-cover"
                />
                <div>
                  <h1 className="text-3xl font-bold">{profile.username}</h1>
                  <p className="text-gray-600">{profile.bio}</p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    <span>{profile.followers.length} Followers</span>
                    <span>{profile.following.length} Following</span>
                  </div>
                </div>
              </div>
              {user?.id !== userId && (
                <button
                  onClick={handleFollow}
                  className={`px-6 py-2 rounded-lg font-semibold ${
                    isFollowing
                      ? 'bg-gray-300 text-gray-800 hover:bg-gray-400'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;