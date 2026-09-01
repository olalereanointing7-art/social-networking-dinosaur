import React, { useState } from 'react';
import axios from 'axios';
import { useUserStore } from '../store/userStore';
import { FaHeart, FaComment, FaShare, FaTrash } from 'react-icons/fa';

function PostCard({ post, onDelete }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes?.length || 0);
  const { user, token } = useUserStore();

  const handleLike = async () => {
    try {
      await axios.post(
        `/api/posts/${post._id}/like`,
        { userId: user?.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLiked(!liked);
      setLikes(liked ? likes - 1 : likes + 1);
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onDelete?.(post._id);
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src={post.author?.profilePicture || 'https://via.placeholder.com/40'}
            alt={post.author?.username}
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
          <div>
            <p className="font-semibold">{post.author?.username}</p>
            <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        {user?.id === post.author?._id && (
          <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
            <FaTrash />
          </button>
        )}
      </div>

      <p className="text-gray-800 mb-3">{post.content}</p>

      {post.image && (
        <img src={post.image} alt="post" className="w-full rounded-lg mb-3 object-cover max-h-96" />
      )}

      <div className="flex items-center justify-between pt-3 border-t">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 ${
            liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
          }`}
        >
          <FaHeart /> {likes}
        </button>
        <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500">
          <FaComment /> {post.comments?.length || 0}
        </button>
        <button className="flex items-center gap-2 text-gray-500 hover:text-green-500">
          <FaShare /> Share
        </button>
      </div>
    </div>
  );
}

export default PostCard;