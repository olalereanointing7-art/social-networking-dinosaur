import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserStore } from '../store/userStore';
import PostCard from '../components/PostCard';
import CreatePost from '../components/CreatePost';
import { FaSpinner } from 'react-icons/fa';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useUserStore();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts/feed', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(response.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="max-w-2xl mx-auto">
        <CreatePost onPostCreated={handlePostCreated} />
        
        {loading ? (
          <div className="text-center py-10">
            <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p>No posts yet. Follow people to see their posts!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;