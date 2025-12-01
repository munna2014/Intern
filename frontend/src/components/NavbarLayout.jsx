import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Users, LogOut, Menu, X, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

function NavbarLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center justify-start gap-3 flex-shrink-0">
              <div className="bg-black p-2 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-black hidden sm:block">StaffFlow</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-1">
              <button
                onClick={() => navigate('/dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  location.pathname === '/dashboard' || location.pathname.startsWith('/staff')
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate('/schedule')}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  location.pathname === '/schedule'
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Schedule
              </button>
            </nav>

            {/* Right side items */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
              
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">{user?.name || 'User'}</span>
              </div>
              
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-red-50 transition-colors group"
              >
                <LogOut className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <div className="px-4 py-3 space-y-1">
              <button
                onClick={() => {
                  navigate('/dashboard');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-all ${
                  location.pathname === '/dashboard' || location.pathname.startsWith('/staff')
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  navigate('/schedule');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-all ${
                  location.pathname === '/schedule'
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Schedule
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main>
        {children}
      </main>
    </div>
  );
}

export default NavbarLayout;
