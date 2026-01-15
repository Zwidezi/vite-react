import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import VideoFeed from './components/VideoFeed';
import Auth from './components/Auth';
import LiveStream from './components/LiveStream';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './App.css';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route 
        path="/" 
        element={user ? <VideoFeed /> : <Navigate to="/auth" replace />} 
      />
      <Route 
        path="/auth" 
        element={!user ? <Auth /> : <Navigate to="/" replace />} 
      />
      <Route 
        path="/live" 
        element={user ? <LiveStream /> : <Navigate to="/auth" replace />} 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
