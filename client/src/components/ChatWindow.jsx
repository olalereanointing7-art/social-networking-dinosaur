import React, { useState } from 'react';
import axios from 'axios';
import { useUserStore } from '../store/userStore';
import { FaPaperPlane } from 'react-icons/fa';

function ChatWindow({ conversation }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(conversation.messages || []);
  const { user, token } = useUserStore();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const response = await axios.post(
        '/api/messages/send',
        {
          senderId: user?.id,
          receiverId: conversation.userId,
          content: message
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages([...messages, response.data.data]);
      setMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg._id} className={`flex ${
            msg.sender._id === user?.id ? 'justify-end' : 'justify-start'
          }`}>
            <div className={`max-w-xs px-4 py-2 rounded-lg ${
              msg.sender._id === user?.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}>
              <p>{msg.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="border-t p-4 flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 font-semibold"
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;