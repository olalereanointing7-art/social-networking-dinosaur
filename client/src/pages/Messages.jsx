import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserStore } from '../store/userStore';
import ChatWindow from '../components/ChatWindow';
import { FaComment, FaSpinner } from 'react-icons/fa';

function Messages() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token, user } = useUserStore();

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    setLoading(false);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <FaComment /> Messages
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-96">
          <div className="bg-white rounded-lg shadow-md p-4 overflow-y-auto">
            <h2 className="font-bold mb-3">Conversations</h2>
            {conversations.length === 0 ? (
              <p className="text-gray-500 text-sm">No conversations yet</p>
            ) : (
              conversations.map((conv) => (
                <div
                  key={conv._id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`p-2 rounded cursor-pointer ${
                    selectedConversation?._id === conv._id
                      ? 'bg-blue-100'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <p className="font-semibold">{conv.name}</p>
                  <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                </div>
              ))
            )}
          </div>

          <div className="md:col-span-2 bg-white rounded-lg shadow-md p-4">
            {selectedConversation ? (
              <ChatWindow conversation={selectedConversation} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>Select a conversation to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;