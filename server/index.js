require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

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

// WebSocket Events
io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);

  socket.on('join-stream', (streamId) => {
    socket.join(`stream-${streamId}`);
    socket.broadcast.to(`stream-${streamId}`).emit('user-joined', { userId: socket.id });
  });

  socket.on('send-message', (data) => {
    io.to(`stream-${data.streamId}`).emit('receive-message', data);
  });

  socket.on('send-gift', (data) => {
    io.to(`stream-${data.streamId}`).emit('receive-gift', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, io };