import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserStore } from '../store/userStore';
import StreamCard from '../components/StreamCard';
import { FaVideo, FaSpinner } from 'react-icons/fa';

function Stream() {
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);
  const { token, user } = useUserStore();

  useEffect(() => {
    fetchStreams();
  }, []);

  const fetchStreams = async () => {
    try {
      const response = await axios.get('/api/streams/live', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStreams(response.data);
    } catch (err) {
      console.error('Error fetching streams:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartStream = async () => {
    try {
      const response = await axios.post(
        '/api/streams/start',
        {
          streamerId: user?.id,
          title: 'My Live Stream',
          description: 'Join me live!',
          type: 'video'
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsStreaming(true);
      setStreams([response.data.stream, ...streams]);
    } catch (err) {
      console.error('Error starting stream:', err);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Live Streams</h1>
          <button
            onClick={handleStartStream}
            disabled={isStreaming}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
          >
            <FaVideo /> {isStreaming ? 'Streaming...' : 'Go Live'}
          </button>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto" />
          </div>
        ) : streams.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p>No active streams. Be the first to go live!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {streams.map((stream) => (
              <StreamCard key={stream._id} stream={stream} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Stream;