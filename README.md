# VidTok - TikTok-Like Video App

A modern, responsive TikTok-like video application built with React, TypeScript, and Tailwind CSS. Features swipeable video feeds, user authentication, live streaming capabilities, and smooth animations.

## ✨ Features

### 🎥 Video Feed
- **Swipeable Interface**: Smooth vertical swiping between videos (mouse wheel or touch)
- **Auto-play Videos**: Videos automatically play when in view
- **Video Controls**: Tap to play/pause, volume control, progress bar
- **Infinite Scroll**: Seamless browsing experience
- **Keyboard Navigation**: Arrow keys for video navigation

### 👤 User Authentication
- **Login/Signup**: Beautiful animated forms with validation
- **Mock Authentication**: Demo-ready with simulated user accounts
- **Persistent Sessions**: User state maintained across browser sessions
- **Profile Management**: User avatars and profile information

### 📱 Live Streaming
- **Go Live**: Start live streaming with camera and microphone
- **Real-time Comments**: Interactive comment system during streams
- **Viewer Count**: Live viewer tracking and display
- **Stream Controls**: Video/audio toggle, settings, and stream management
- **Live Interactions**: Heart reactions and engagement features

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Beautiful frosted glass effects
- **Smooth Animations**: Framer Motion powered interactions
- **Responsive Design**: Perfect on mobile, tablet, and desktop
- **TikTok-inspired Interface**: Familiar and intuitive user experience
- **Dark Theme**: Elegant dark mode design

### 🚀 Technical Features
- **TypeScript**: Full type safety and better development experience
- **React 18**: Latest React features and optimizations
- **Tailwind CSS**: Utility-first styling with custom components
- **Vite**: Lightning-fast build tool and development server
- **ESLint**: Code quality and consistency

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 16+ and npm
- Modern web browser
- Camera/microphone access for live streaming (optional)

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   ```
   http://localhost:5173
   ```

## 🎮 Usage Guide

### Getting Started
1. **Authentication**: Use the demo credentials or create a new account
   - Demo email: `demo@example.com`
   - Demo password: `123456`

2. **Video Feed**: 
   - Swipe up/down or use arrow keys to navigate videos
   - Tap video to play/pause
   - Use action buttons to like, comment, share, or follow users

3. **Live Streaming**:
   - Click the "LIVE" button in the top navigation
   - Allow camera/microphone permissions (or simulate without)
   - Configure settings and start streaming
   - Interact with viewers through comments and reactions

### Navigation
- **Home Feed**: Main video browsing experience
- **Live Stream**: Broadcasting and viewer interface
- **Profile**: User authentication and management

### Video Controls
- **Play/Pause**: Tap anywhere on the video
- **Volume**: Use the volume button in top-right corner
- **Progress**: View progress bar at bottom when controls are visible
- **Next/Previous**: Swipe or use arrow keys

## 🎯 Demo Features

### Mock Data
- **Sample Videos**: Curated demo videos from Google's sample library
- **Fake Users**: Generated user profiles with avatars
- **Simulated Interactions**: Likes, comments, follows, and view counts
- **Live Comments**: Auto-generated viewer comments during streams

### Responsive Design
- **Mobile First**: Optimized for touch interactions
- **Desktop Compatible**: Full keyboard and mouse support
- **Cross-browser**: Works on modern browsers (Chrome, Firefox, Safari, Edge)

## 🔧 Development

### Project Structure
```
src/
├── components/          # React components
│   ├── Auth.tsx        # Login/signup forms
│   ├── VideoFeed.tsx   # Main video feed
│   ├── VideoPlayer.tsx # Video player component
│   └── LiveStream.tsx  # Live streaming interface
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state management
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── styles/             # CSS and styling
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Customization
- **Colors**: Modify theme in `tailwind.config.js`
- **Videos**: Update video URLs in `VideoFeed.tsx`
- **Animations**: Adjust Framer Motion settings in components
- **API Integration**: Replace mock data with real API calls

## 🌟 Key Technologies

- **React 18** - UI library with latest features
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and gestures
- **React Router** - Client-side routing
- **React Hook Form** - Form handling and validation
- **Lucide React** - Beautiful icon library
- **Vite** - Fast build tool

## 📱 Mobile Features

- **Touch Gestures**: Optimized swipe interactions
- **Viewport Handling**: Dynamic viewport height support
- **Performance**: Optimized for mobile devices
- **PWA Ready**: Can be installed as a Progressive Web App

## 🚀 Production Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Static Hosting
The built files in `dist/` can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Any static hosting service

## 📄 License

This project is available under the MIT License. Feel free to use it for learning, development, or as a foundation for your own TikTok-like application.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests to improve the application.

---

**Note**: This is a demonstration application with mock data and simulated features. For production use, integrate with real APIs for authentication, video storage, and live streaming services.
