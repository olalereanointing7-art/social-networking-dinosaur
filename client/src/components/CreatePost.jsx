import React, { useState } from 'react';
import axios from 'axios';
import { useUserStore } from '../store/userStore';
import { FaImage, FaVideo, FaPaperPlane } from 'react-icons/fa';

function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, token } = useUserStore();

  const handlePost = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        '/api/posts/create',
        {
          userId: user?.id,
          content,
          image
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onPostCreated(response.data.post);
      setContent('');
      setImage(null);
    } catch (err) {
      console.error('Error creating post:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-start mb-3">
        <img
          src={user?.profilePicture || 'https://via.placeholder.com/40'}
          alt={user?.username}
          className="w-10 h-10 rounded-full mr-3 object-cover"
        />
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="flex-1 outline-none bg-gray-100 rounded-full px-4 py-2 resize-none"
        />
      </div>

      <div className="flex items-center justify-between pl-12 pt-3 border-t">
        <div className="flex gap-3">
          <button className="flex items-center gap-2 text-blue-500 hover:bg-blue-50 px-3 py-2 rounded">
            <FaImage /> Photo
          </button>
          <button className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-3 py-2 rounded">
            <FaVideo /> Video
          </button>
        </div>
        <button
          onClick={handlePost}
          disabled={!content.trim() || loading}
          className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
        >
          <FaPaperPlane /> {loading ? 'Posting...' : 'Post'}
        </button>
      </div>
    </div>
  );
}

export default CreatePost;