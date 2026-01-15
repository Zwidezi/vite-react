import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LoginForm {
  email: string;
  password: string;
}

interface SignupForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, signup, loading } = useAuth();

  const loginForm = useForm<LoginForm>();
  const signupForm = useForm<SignupForm>();

  const onLogin = async (data: LoginForm) => {
    setError('');
    const success = await login(data.email, data.password);
    if (!success) {
      setError('Invalid email or password');
    }
  };

  const onSignup = async (data: SignupForm) => {
    setError('');
    
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const success = await signup(data.username, data.email, data.password);
    if (!success) {
      setError('Failed to create account');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-8 shadow-2xl"
        >
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <motion.h1 
              className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              VidTok
            </motion.h1>
            <p className="text-gray-400 mt-2">Join the video revolution</p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-gray-800 rounded-lg p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                isLogin 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                !isLogin 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4"
              >
                <p className="text-red-400 text-sm">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Forms */}
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={loginForm.handleSubmit(onLogin)}
                className="space-y-4"
              >
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...loginForm.register('email', { required: true })}
                    type="email"
                    placeholder="Email address"
                    className="form-input pl-12"
                    disabled={loading}
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...loginForm.register('password', { required: true })}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="form-input pl-12 pr-12"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  {loading ? (
                    <div className="spinner mr-2" />
                  ) : null}
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={signupForm.handleSubmit(onSignup)}
                className="space-y-4"
              >
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...signupForm.register('username', { required: true })}
                    type="text"
                    placeholder="Username"
                    className="form-input pl-12"
                    disabled={loading}
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...signupForm.register('email', { required: true })}
                    type="email"
                    placeholder="Email address"
                    className="form-input pl-12"
                    disabled={loading}
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...signupForm.register('password', { required: true })}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="form-input pl-12 pr-12"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...signupForm.register('confirmPassword', { required: true })}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm password"
                    className="form-input pl-12"
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  {loading ? (
                    <div className="spinner mr-2" />
                  ) : null}
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
            <p className="text-gray-400 text-xs text-center mb-2">Demo Credentials:</p>
            <p className="text-gray-500 text-xs text-center">
              Email: demo@example.com | Password: 123456
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;