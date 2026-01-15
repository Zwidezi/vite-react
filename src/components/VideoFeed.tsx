import React, { useState, useEffect, useRef } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Share, MoreHorizontal, User, Radio } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import VideoPlayer from './VideoPlayer';

interface Video {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  user: {
    id: string;
    username: string;
    avatar: string;
    verified?: boolean;
  };
}

// Mock video data - in a real app, this would come from an API
const mockVideos: Video[] = [
  {
    id: '1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    title: 'Big Buck Bunny',
    description: 'A funny animated short film about a rabbit 🐰 #animation #funny #shorts',
    likes: 125400,
    comments: 2341,
    shares: 892,
    user: {
      id: '1',
      username: 'animator_pro',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=animator_pro',
      verified: true
    }
  },
  {
    id: '2',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
    title: 'Elephants Dream',
    description: 'Mind-blowing CGI animation that will make you think 🤯 #cgi #animation #art',
    likes: 98760,
    comments: 1876,
    shares: 543,
    user: {
      id: '2',
      username: 'cgi_master',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=cgi_master'
    }
  },
  {
    id: '3',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
    title: 'For Bigger Blazes',
    description: 'Epic action sequence that will blow your mind! 💥 #action #epic #cinema',
    likes: 234567,
    comments: 4521,
    shares: 1234,
    user: {
      id: '3',
      username: 'action_director',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=action_director',
      verified: true
    }
  }
];

const VideoFeed: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videos] = useState<Video[]>(mockVideos);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [following, setFollowing] = useState<Set<string>>(new Set());
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  const currentVideo = videos[currentIndex];

  const handleSwipe = (event: any, info: PanInfo) => {
    const { offset, velocity } = info;
    
    if (offset.y < -100 || velocity.y < -500) {
      // Swipe up - next video
      if (currentIndex < videos.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    } else if (offset.y > 100 || velocity.y > 500) {
      // Swipe down - previous video
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  const handleLike = (videoId: string) => {
    setLiked(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(videoId)) {
        newLiked.delete(videoId);
      } else {
        newLiked.add(videoId);
      }
      return newLiked;
    });
  };

  const handleFollow = (userId: string) => {
    setFollowing(prev => {
      const newFollowing = new Set(prev);
      if (newFollowing.has(userId)) {
        newFollowing.delete(userId);
      } else {
        newFollowing.add(userId);
      }
      return newFollowing;
    });
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (e.key === 'ArrowDown' && currentIndex < videos.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, videos.length]);

  return (
    <div className="h-screen bg-black overflow-hidden relative">
      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center space-x-4">
          <img 
            src={user?.avatar} 
            alt="Profile" 
            className="w-8 h-8 rounded-full border-2 border-white/20"
          />
          <span className="text-white font-medium">@{user?.username}</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/live')}
            className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-full flex items-center space-x-2 font-medium transition-colors"
          >
            <Radio className="w-4 h-4" />
            <span>LIVE</span>
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={logout}
            className="text-white/80 hover:text-white"
          >
            <MoreHorizontal className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Video Container */}
      <motion.div
        ref={containerRef}
        className="h-full w-full"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={handleSwipe}
        animate={controls}
      >
        <div className="relative h-full w-full">
          {/* Video Player */}
          <VideoPlayer 
            video={currentVideo}
            isActive={true}
            className="w-full h-full object-cover"
          />

          {/* Video Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <div className="flex justify-between items-end">
              {/* Left side - Video info */}
              <div className="flex-1 mr-4">
                <div className="flex items-center space-x-3 mb-3">
                  <img 
                    src={currentVideo.user.avatar} 
                    alt={currentVideo.user.username}
                    className="w-12 h-12 rounded-full border-2 border-white"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-semibold">
                        @{currentVideo.user.username}
                      </span>
                      {currentVideo.user.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleFollow(currentVideo.user.id)}
                      className={`mt-1 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        following.has(currentVideo.user.id)
                          ? 'bg-gray-600 text-white'
                          : 'bg-primary text-white'
                      }`}
                    >
                      {following.has(currentVideo.user.id) ? 'Following' : 'Follow'}
                    </motion.button>
                  </div>
                </div>
                
                <p className="text-white text-sm mb-2 line-clamp-2">
                  {currentVideo.description}
                </p>
              </div>

              {/* Right side - Action buttons */}
              <div className="flex flex-col space-y-4">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleLike(currentVideo.id)}
                  className="flex flex-col items-center space-y-1"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    liked.has(currentVideo.id) ? 'bg-primary' : 'bg-white/20'
                  } backdrop-blur-sm`}>
                    <Heart 
                      className={`w-6 h-6 ${
                        liked.has(currentVideo.id) ? 'text-white fill-current' : 'text-white'
                      }`} 
                    />
                  </div>
                  <span className="text-white text-xs font-medium">
                    {formatNumber(currentVideo.likes + (liked.has(currentVideo.id) ? 1 : 0))}
                  </span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center space-y-1"
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white text-xs font-medium">
                    {formatNumber(currentVideo.comments)}
                  </span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center space-y-1"
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Share className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white text-xs font-medium">
                    {formatNumber(currentVideo.shares)}
                  </span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center space-y-1"
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Video Progress Indicator */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col space-y-1">
            {videos.map((_, index) => (
              <div
                key={index}
                className={`w-1 h-8 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Swipe Hint */}
      {currentIndex === 0 && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/60 text-sm text-center"
        >
          <div className="bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
            Swipe up for next video
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default VideoFeed;