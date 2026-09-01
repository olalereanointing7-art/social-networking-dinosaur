# Dinosaur Social Networking Platform 🦕

A modern, feature-rich social networking application built with the MERN stack (MongoDB, Express, React, Node.js), featuring live streaming, gaming, messaging, and more!

## Features ✨

- **User Authentication**: Secure login and registration with JWT
- **Social Feed**: Create, like, and comment on posts
- **Live Streaming**: Go live and watch live streams with real-time chat
- **Gaming**: Play multiplayer games with other users
- **Messaging**: Direct messaging with real-time notifications
- **User Profiles**: Customizable profiles with followers/following
- **Gift System**: Send gifts to streamers and earn rewards
- **Subscriptions**: Premium membership with exclusive features
- **Responsive Design**: Works seamlessly on desktop and mobile

## Tech Stack 🛠️

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- Socket.io for real-time features
- JWT for authentication
- Stripe for payments

### Frontend
- React 18
- React Router for navigation
- Tailwind CSS for styling
- Zustand for state management
- Axios for API calls
- Socket.io-client for real-time updates

## Installation 🚀

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/social-networking-dinosaur.git
cd social-networking-dinosaur
```

2. **Install dependencies**
```bash
npm run install-all
```

3. **Configure environment variables**

**Server (.env)**
```bash
cd server
cp .env.example .env
```
Edit `.env` with your MongoDB URI, JWT secret, etc.

**Client (.env)**
```bash
cd ../client
cp .env.example .env
```

4. **Start the application**

From the root directory:
```bash
npm run dev
```

Or separately:
```bash
# Terminal 1 - Server
cd server && npm run dev

# Terminal 2 - Client
cd client && npm start
```

## Project Structure 📁

```
social-networking-dinosaur/
├── server/
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Custom middleware
│   ├── index.js         # Server entry point
│   └── package.json
├── client/
│   ├── public/          # Static files
│   ├── src/
│   │   ├── pages/       # React pages
│   │   ├── components/  # Reusable components
│   │   ├── store/       # Zustand stores
│   │   ├── services/    # API services
│   │   ├── App.js       # Main app component
│   │   └── index.js     # React entry point
│   └── package.json
└── package.json
```

## API Documentation 📚

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify` - Verify token

### Users
- `GET /api/users/:userId` - Get user profile
- `PUT /api/users/:userId/update` - Update profile
- `POST /api/users/:userId/follow` - Follow/unfollow user
- `GET /api/users/search/:query` - Search users

### Posts
- `GET /api/posts/feed` - Get feed
- `POST /api/posts/create` - Create post
- `POST /api/posts/:postId/like` - Like/unlike post
- `DELETE /api/posts/:postId` - Delete post

### Comments
- `POST /api/comments/create` - Add comment
- `GET /api/comments/post/:postId` - Get comments
- `POST /api/comments/:commentId/like` - Like comment
- `DELETE /api/comments/:commentId` - Delete comment

### Streams
- `POST /api/streams/start` - Start stream
- `PUT /api/streams/:streamId/end` - End stream
- `GET /api/streams/live` - Get live streams
- `POST /api/streams/:streamId/join` - Join stream
- `POST /api/streams/:streamId/gift` - Send gift

### Games
- `GET /api/games` - Get all games
- `GET /api/games/category/:category` - Get games by category
- `POST /api/games/:gameId/join` - Join game
- `POST /api/games/:gameId/leave` - Leave game

### Messages
- `POST /api/messages/send` - Send message
- `GET /api/messages/conversation/:userId1/:userId2` - Get conversation
- `PUT /api/messages/:messageId/read` - Mark as read
- `DELETE /api/messages/:messageId` - Delete message

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Support 💬

For support, email olalereanointing7@gmail.com or open an issue on GitHub.

## Roadmap 🗺️

- [ ] Video streaming with HLS/RTMP
- [ ] AI-powered recommendations
- [ ] Mobile app (React Native)
- [ ] Payment integration (Stripe)
- [ ] Admin dashboard
- [ ] Advanced analytics
- [ ] Content moderation tools
- [ ] API rate limiting

---

Built with ❤️ by Anointing Kolapo Olalere