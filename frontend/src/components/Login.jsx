import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, LogIn, Users } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Same background images as Home page
  const backgroundImages = [
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&h=1080&fit=crop&crop=center&auto=format',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&h=1080&fit=crop&crop=center&auto=format',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1080&fit=crop&crop=center&auto=format',
    'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1920&h=1080&fit=crop&crop=center&auto=format'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    console.log('Submitting login with:', formData);
    const result = await login(formData.username, formData.password);
    console.log('Login result:', result);
    
    if (result.success && result.user) {
      console.log('Login successful, navigating...');
      if (result.user.role === 'admin') {
        navigate('/profile');
      } else if (result.user.role === 'manager') {
        navigate('/manager-dashboard');
      } else {
        navigate('/staff-profile');
      }
    } else {
      console.log('Login failed:', result.error);
      setError(result.error || 'Login failed');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background - Same as Home page */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Background ${index + 1}`}
              className="w-full h-full object-cover blur-sm"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}
      </div>
      {/* Navbar */}
      <header className="relative z-10 bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/home')}
                className="flex items-center gap-3 hover:opacity-80 transition"
              >
                <div className="bg-black p-2 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">StaffFlow</h1>
              </button>
            </div>
            
            <nav className="flex items-center gap-4">
              <button
                onClick={() => navigate('/register')}
                className="text-gray-300 hover:text-white font-medium transition"
              >
                Register
              </button>
              <button
                onClick={() => navigate('/login')}
                className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
              >
                Sign In
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <div className="max-w-lg w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-10 border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:bg-white/10 transition"
                  placeholder="Enter your username"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:bg-white/10 transition pr-12"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <button
                  onClick={() => navigate('/register')}
                  className="text-white hover:text-gray-200 font-medium transition"
                >
                  Register
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
