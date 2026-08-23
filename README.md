# Social Networking Dinosaur 🦕

A modern social networking platform with live streaming, multiplayer games, and monetization features.

## Features

### Core Social Features
- 👤 User profiles with followers/following system
- 📝 Public posts (text, images, videos)
- 💬 Comments with nested replies
- ❤️ Like system (posts & comments)
- 🔔 Real-time notifications
- 💌 Direct messaging with online status, read receipts, typing indicators

### Live Streaming
- 🎥 Video live streaming
- 🎙️ Audio live streaming
- 💬 Live chat during streams
- 🎁 Gift system with monetization
- 👥 Host feature (pass hosting to other streamers)
- 💰 Streamer earnings tracking

### Gaming
- ⚽ Football
- ♟️ Chess
- 🏎️ Racing Games
- 🎴 Card Games
- 🎯 Ludo
- 🎮 More games coming soon

### Monetization
- 🎁 Gifts during live streams (50% to streamer, 50% to app)
- 💳 Paid subscription plans
- 📊 Earnings dashboard
- 💵 Easy payout system

## Tech Stack

- **Backend:** Node.js + Express
- **Frontend:** React + Tailwind CSS
- **Database:** MongoDB/PostgreSQL
- **Real-time:** WebSocket (Socket.io)
- **Streaming:** HLS/RTMP
- **Hosting:** Railway/Render (Free tier)

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- MongoDB Atlas account (free tier)

### Installation

```bash
git clone https://github.com/olalereanointing7-art/social-networking-dinosaur.git
cd social-networking-dinosaur

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

## Environment Variables

```
DATABASE_URL=your_mongodb_url
JWT_SECRET=your_secret_key
STRIPE_KEY=your_stripe_key
UPLOAD_URL=your_upload_service
NODE_ENV=development
PORT=5000
```

## Deployment

Deploy to Railway or Render (free):

1. Push to GitHub
2. Connect your repository to Railway/Render
3. Set environment variables
4. Deploy!

## Usage

### For Users
1. Sign up with email/username
2. Create your profile
3. Make posts, comment, and like content
4. Start live streaming
5. Play games with friends
6. Send/receive gifts

### For Streamers
1. Go to "Go Live"
2. Start streaming (video or audio)
3. Viewers can gift you (you get 50%)
4. View earnings in dashboard

## API Documentation

See `docs/API.md` for complete API reference

## Contributing

Pull requests welcome! Please follow our contribution guidelines.

## License

MIT License - See LICENSE file

## Support

Email: anointingolalere4@gmail.com

## Roadmap

- [ ] Stories/Reels feature
- [ ] Advanced search & discovery
- [ ] Trending section
- [ ] Video editing tools
- [ ] Mobile app (React Native)
- [ ] AI recommendations
- [ ] More games integration

---

**Status:** 🚀 Active Development

**Last Updated:** August 23, 2026
