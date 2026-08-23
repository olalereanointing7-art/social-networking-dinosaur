const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.APP_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Database Connection
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/streams', require('./routes/streams'));
app.use('/api/games', require('./routes/games'));
app.use('/api/gifts', require('./routes/gifts'));
app.use('/api/subscriptions', require('./routes/subscriptions'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// Socket.io Real-time Events
io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  // User Status
  socket.on('user-online', (userId) => {
    socket.broadcast.emit('user-status', { userId, online: true });
  });

  socket.on('user-offline', (userId) => {
    socket.broadcast.emit('user-status', { userId, online: false });
  });

  // Messaging
  socket.on('send-message', (data) => {
    socket.broadcast.emit('receive-message', data);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('user-typing', data);
  });

  socket.on('stop-typing', (data) => {
    socket.broadcast.emit('user-stop-typing', data);
  });

  // Live Streaming
  socket.on('start-stream', (data) => {
    io.emit('stream-started', data);
  });

  socket.on('end-stream', (data) => {
    io.emit('stream-ended', data);
  });

  socket.on('stream-chat', (data) => {
    io.emit('receive-stream-chat', data);
  });

  // Gaming
  socket.on('game-invite', (data) => {
    socket.broadcast.emit('receive-game-invite', data);
  });

  socket.on('game-move', (data) => {
    socket.broadcast.emit('receive-game-move', data);
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 WebSocket ready for real-time events`);
});

module.exports = { app, io };
