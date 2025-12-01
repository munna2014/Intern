import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Clock, Calendar, MapPin, Home, FileText, Settings, HelpCircle, LogOut,
  Cloud, Sun, CloudRain, Wind, Thermometer, Users, MessageSquare, Bell,
  ChevronLeft, ChevronRight, Edit2, Save, X, Mail, Phone, Briefcase, CheckCircle, AlertCircle,
  TrendingUp, CalendarDays, ArrowRight, Activity, HomeIcon, MapPin as MapPinIcon,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function ProfileLayout({ children, activeView = 'schedule' }) {
  const { user: staff } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClockedIn, setIsClockedIn] = useState(() => {
    // Get initial state from localStorage
    const savedState = localStorage.getItem('isClockedIn');
    return savedState === 'true';
  });
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Save check-in state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isClockedIn', isClockedIn.toString());
  }, [isClockedIn]);

  const sidebarNavItems = [
    { id: 'staff-dashboard', label: 'Dashboard', icon: Home, path: '/staff-dashboard' },
    { id: 'schedule', label: 'Schedule', icon: Calendar, path: '/staff-profile' },
    { id: 'record-history', label: 'Record & History', icon: FileText, path: '/record-history' },
    { id: 'profile-setting', label: 'Profile Setting', icon: User, path: '/profile-setting' },
    { id: 'support-help', label: 'Support & Help', icon: HelpCircle, path: '/support-help' },
  ];

  const getCurrentPath = () => {
    const path = window.location.pathname;
    const staffPaths = ['/staff-dashboard', '/staff-profile', '/record-history', '/profile-setting', '/support-help'];

    if (staffPaths.includes(path)) return 'profile';
    if (path === '/home') return 'home';
    if (path === '/profile') return 'profile';
    return '';
  };

  const getSidebarPath = () => {
    const path = window.location.pathname;
    if (path === '/staff-dashboard') return 'staff-dashboard';
    if (path === '/staff-profile') return 'schedule';
    if (path === '/record-history') return 'record-history';
    if (path === '/profile-setting') return 'profile-setting';
    if (path === '/support-help') return 'support-help';
    return 'profile';
  };

  const currentActiveView = getCurrentPath();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Main Navbar */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center justify-start gap-3 flex-shrink-0">
              <button 
                onClick={() => navigate('/home')}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="bg-black p-2 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-black hidden sm:block">StaffFlow</h1>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-1">
              <button
                onClick={() => navigate('/home')}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  currentActiveView === 'home'
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                <HomeIcon className="w-4 h-4" />
                Home
              </button>
              <button
                onClick={() => navigate('/profile')}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  currentActiveView === 'profile'
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                <User className="w-4 h-4" />
                Profile
              </button>
            </nav>

            {/* User Info & Logout */}
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
              <span className="text-gray-600 text-sm">
                {staff?.username || 'Staff Member'} ({staff?.role || 'user'})
              </span>
              <button
                onClick={() => navigate('/login')}
                className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-screen overflow-hidden pt-16">
        {/* Enhanced Left Sidebar - Positioned at most left */}
        <div className="w-72 bg-white shadow-2xl border-r border-gray-100 fixed left-0 top-0 h-full z-50">
          <div className="p-6 relative h-full flex flex-col">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">StaffFlow</span>
            </div>
            
            {/* Navigation */}
            <nav className="space-y-2 flex-1">
              {sidebarNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-200 group ${
                    getSidebarPath() === item.id
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50'
                  }`}
                >
                  <item.icon className={`w-6 h-6 ${
                    getSidebarPath() === item.id ? 'text-white' : 'group-hover:text-blue-600'
                  }`} />
                  <span className={`font-medium ${
                    getSidebarPath() === item.id ? 'text-white' : 'group-hover:text-blue-600'
                  }`}>{item.label}</span>
                </button>
              ))}
            </nav>
            
            {/* User Info */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold">
                  {staff?.avatar || staff?.name?.charAt(0)?.toUpperCase() || 'J'}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900">{staff?.name || 'John'}</div>
                  <div className="text-xs text-gray-500">{staff?.role || 'Staff Member'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content with left margin to account for fixed sidebar */}
        <div className="flex-1 ml-72 overflow-auto">
          {/* Top Header */}
          <div className="bg-white shadow-sm border-b border-gray-100">
            <div className="px-8 py-6">
              <div className="flex items-center justify-between gap-6">
                {/* Greeting */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                      {staff?.avatar || staff?.name?.charAt(0)?.toUpperCase() || 'J'}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Hello, {staff?.username || 'Staff Member'}! 👋</h1>
                    <p className="text-sm text-gray-600">{staff?.role || 'Regional Assistant Manager'}</p>
                  </div>
                </div>

                {/* Time & Status */}
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">
                      {currentTime.toLocaleTimeString()}
                    </div>
                    <div className="text-xs text-gray-600">
                      {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setIsClockedIn(!isClockedIn)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md ${
                      isClockedIn 
                        ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white' 
                        : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                    }`}
                  >
                    {isClockedIn ? 'Check-Out' : 'Check-In'}
                  </button>
                  
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${isClockedIn ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span className="text-xs font-medium text-gray-700">
                      {isClockedIn ? 'Checked In' : 'Not Checked In'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <main>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProfileLayout;