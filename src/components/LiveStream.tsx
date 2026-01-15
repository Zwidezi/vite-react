import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  X, 
  Users, 
  Heart, 
  MessageCircle, 
  Settings,
  ArrowLeft,
  Radio
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LiveStreamProps {}

const LiveStream: React.FC<LiveStreamProps> = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<Array<{id: string, user: string, message: string, timestamp: Date}>>([]);
  const [newComment, setNewComment] = useState('');
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const commentsEndRef = useRef<HTMLDivElement>(null);

  // Mock data for demonstration
  const mockComments = [
    { id: '1', user: 'viewer123', message: 'Great stream! 🔥', timestamp: new Date() },
    { id: '2', user: 'fan_account', message: 'Love your content!', timestamp: new Date() },
    { id: '3', user: 'music_lover', message: 'Can you play that song again?', timestamp: new Date() },
  ];

  useEffect(() => {
    // Simulate live viewer count fluctuation
    if (isStreaming) {
      const interval = setInterval(() => {
        setViewerCount(prev => Math.max(0, prev + Math.floor(Math.random() * 10) - 4));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isStreaming]);

  useEffect(() => {
    // Simulate incoming comments during stream
    if (isStreaming) {
      const interval = setInterval(() => {
        if (Math.random() > 0.7) {
          const randomComment = mockComments[Math.floor(Math.random() * mockComments.length)];
          setComments(prev => [...prev, {
            ...randomComment,
            id: Date.now().toString(),
            timestamp: new Date()
          }]);
        }
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isStreaming]);

  useEffect(() => {
    // Auto-scroll comments
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  const startStream = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: isVideoEnabled,
        audio: isAudioEnabled
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
      setIsStreaming(true);
      setViewerCount(Math.floor(Math.random() * 50) + 10);
    } catch (error) {
      console.error('Error accessing media devices:', error);
      // For demo purposes, we'll simulate a stream without camera access
      setIsStreaming(true);
      setViewerCount(Math.floor(Math.random() * 50) + 10);
    }
  };

  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    
    setIsStreaming(false);
    setViewerCount(0);
    setComments([]);
    setLikes(0);
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoEnabled;
      }
    }
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isAudioEnabled;
      }
    }
  };

  const addComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && user) {
      setComments(prev => [...prev, {
        id: Date.now().toString(),
        user: user.username,
        message: newComment.trim(),
        timestamp: new Date()
      }]);
      setNewComment('');
    }
  };

  const addLike = () => {
    setLikes(prev => prev + 1);
  };

  if (!isStreaming) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="flex items-center mb-8">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/')}
              className="mr-4 text-white/80 hover:text-white"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
            <h1 className="text-2xl font-bold text-white">Go Live</h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-8 shadow-2xl"
          >
            {/* Preview */}
            <div className="relative aspect-video bg-gray-800 rounded-lg mb-6 overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              
              {!isVideoEnabled && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                  <VideoOff className="w-12 h-12 text-gray-500" />
                </div>
              )}
              
              <div className="absolute top-4 left-4">
                <div className="flex items-center space-x-2 bg-black/50 rounded-full px-3 py-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-white text-sm">Preview</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center space-x-4 mb-6">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleVideo}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  isVideoEnabled ? 'bg-gray-700 text-white' : 'bg-red-500 text-white'
                }`}
              >
                {isVideoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleAudio}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  isAudioEnabled ? 'bg-gray-700 text-white' : 'bg-red-500 text-white'
                }`}
              >
                {isAudioEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full bg-gray-700 text-white flex items-center justify-center"
              >
                <Settings className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Start Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={startStream}
              className="btn-primary w-full flex items-center justify-center space-x-2 text-lg py-4"
            >
              <Radio className="w-6 h-6" />
              <span>Start Live Stream</span>
            </motion.button>

            <p className="text-gray-400 text-center text-sm mt-4">
              Your followers will be notified when you go live
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black overflow-hidden relative">
      {/* Stream Video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        
        {!isVideoEnabled && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="text-center">
              <VideoOff className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">Camera is off</p>
            </div>
          </div>
        )}
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-40 flex justify-between items-center p-4 bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center space-x-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={stopStream}
            className="text-white/80 hover:text-white"
          >
            <X className="w-6 h-6" />
          </motion.button>
          
          <div className="flex items-center space-x-2 bg-red-500 rounded-full px-3 py-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-medium">LIVE</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 bg-black/50 rounded-full px-3 py-1">
            <Users className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">{viewerCount}</span>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex items-end space-x-4">
          {/* Comments Section */}
          <div className="flex-1">
            <div className="max-h-40 overflow-y-auto mb-4 space-y-2">
              <AnimatePresence>
                {comments.slice(-5).map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-black/50 rounded-lg px-3 py-2 backdrop-blur-sm"
                  >
                    <span className="text-primary font-medium text-sm">@{comment.user}: </span>
                    <span className="text-white text-sm">{comment.message}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={commentsEndRef} />
            </div>

            <form onSubmit={addComment} className="flex space-x-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder-white/60 text-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium"
              >
                Send
              </motion.button>
            </form>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={addLike}
              className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <Heart className="w-6 h-6 text-white" />
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleVideo}
              className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm ${
                isVideoEnabled ? 'bg-white/20' : 'bg-red-500'
              }`}
            >
              {isVideoEnabled ? <Video className="w-6 h-6 text-white" /> : <VideoOff className="w-6 h-6 text-white" />}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleAudio}
              className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm ${
                isAudioEnabled ? 'bg-white/20' : 'bg-red-500'
              }`}
            >
              {isAudioEnabled ? <Mic className="w-6 h-6 text-white" /> : <MicOff className="w-6 h-6 text-white" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Like Animation */}
      <AnimatePresence>
        {likes > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute top-1/2 right-20 text-6xl"
          >
            ❤️
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveStream;