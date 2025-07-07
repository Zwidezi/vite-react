import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

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

interface VideoPlayerProps {
  video: Video;
  isActive: boolean;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, isActive, className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play when video becomes active
  useEffect(() => {
    if (videoRef.current && isActive) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    } else if (videoRef.current && !isActive) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  // Update progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const currentTime = video.currentTime;
      const duration = video.duration;
      if (duration > 0) {
        setProgress((currentTime / duration) * 100);
      }
    };

    const updateDuration = () => {
      setDuration(video.duration);
      setLoading(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      // Loop the video
      video.currentTime = 0;
      video.play();
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('canplay', () => setLoading(false));

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('canplay', () => setLoading(false));
    };
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoClick = () => {
    togglePlayPause();
    setShowControls(true);
    setTimeout(() => setShowControls(false), 2000);
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative w-full h-full group">
      {/* Video Element */}
      <video
        ref={videoRef}
        className={`w-full h-full object-cover cursor-pointer ${className}`}
        src={video.url}
        poster={video.thumbnail}
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
        onClick={handleVideoClick}
        onLoadStart={() => setLoading(true)}
        onCanPlay={() => setLoading(false)}
      />

      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="spinner bg-white"></div>
        </div>
      )}

      {/* Play/Pause Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: showControls ? 1 : 0.8 }}
          className="bg-black/50 rounded-full p-4 backdrop-blur-sm"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 text-white" />
          ) : (
            <Play className="w-8 h-8 text-white" />
          )}
        </motion.div>
      </motion.div>

      {/* Controls Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showControls || !isPlaying ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"
      >
        {/* Top Right Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 pointer-events-auto">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleMute}
            className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-white" />
            ) : (
              <Volume2 className="w-5 h-5 text-white" />
            )}
          </motion.button>
        </div>

        {/* Bottom Progress Bar */}
        <div className="absolute bottom-4 left-4 right-4 pointer-events-auto">
          <div className="flex items-center space-x-2 text-white text-xs">
            <span>{formatTime((progress / 100) * duration)}</span>
            <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </motion.div>

      {/* Tap to Play/Pause Hint */}
      {!isPlaying && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center bg-black/20"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-black/50 rounded-full p-6 backdrop-blur-sm cursor-pointer"
            onClick={handleVideoClick}
          >
            <Play className="w-12 h-12 text-white" />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default VideoPlayer;