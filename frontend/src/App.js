import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { assignmentService } from './services/assignmentService';
import { vendorService } from './services/vendorService';
import { staffService } from './services/staffService';
import Home from './components/Home';
import Contact from './components/Contact';
import VendorList from './components/VendorList';
import StaffProfile from './components/StaffProfile';
import StaffList from './components/StaffList';
import StaffAssignment from './components/StaffAssignment';
import CheckInOut from './components/CheckInOut';
import Dashboard from './components/Dashboard';
import ColorCustomizer from './components/ColorCustomizer';
import {
  Home as HomeIcon,
  Calendar,
  MapPin,
  Users,
  ClipboardList,
  CheckCircle,
  Bell,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import './App.css';

function App({ activeTab: propActiveTab }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { user, logout, isAdmin } = useAuth();
  
  // Handle logout with navigation
  const handleLogout = () => {
    logout();
    navigate('/home');
  };
  
  // Get active tab from URL path or prop
  const getActiveTabFromPath = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/staff')) return 'staff';
    if (path.startsWith('/vendors')) return 'vendors';
    if (path.startsWith('/profile')) return 'profile';
    if (path.startsWith('/reports')) return 'reports';
    if (path.startsWith('/settings')) return 'settings';
    if (path.startsWith('/contact')) return 'contact';
    if (path.startsWith('/staff-dashboard')) return 'dashboard';
    if (path.startsWith('/assignments')) return 'assignments';
    if (path.startsWith('/checkin')) return 'checkin';
    return 'home';
  };

  const [activeTab, setActiveTab] = useState(propActiveTab || getActiveTabFromPath());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [staff, setStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Load data from API on mount
  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      const [vendorsData, staffData, assignmentsData] = await Promise.all([
        vendorService.getAll(),
        staffService.getAll(),
        assignmentService.getAll(),
      ]);
      setVendors(vendorsData || []);
      setStaff(staffData || []);
      setAssignments(assignmentsData || []);
    } catch (error) {
      console.error('Failed to load data:', error);
      addNotification('Failed to load data', 'error');
    }
  };

  const generateSchedule = async () => {
    try {
      const response = await assignmentService.generateSchedule();
      if (response.success) {
        setAssignments(response.data.assignments);
        addNotification(`Generated ${response.data.count} assignments`, 'success');
        // Reload data to get updated state
        loadData();
      }
    } catch (error) {
      console.error('Failed to generate schedule:', error);
      addNotification('Failed to generate schedule', 'error');
    }
  };

  const handleCheckIn = async (assignmentId) => {
    try {
      const response = await assignmentService.checkIn(assignmentId);
      if (response.success) {
        setAssignments(prev =>
          prev.map(a => a.id === assignmentId ? response.data : a)
        );
        addNotification('Checked in successfully', 'success');
      }
    } catch (error) {
      console.error('Check-in failed:', error);
      addNotification('Check-in failed', 'error');
    }
  };

  const handleCheckOut = async (assignmentId) => {
    try {
      const response = await assignmentService.checkOut(assignmentId);
      if (response.success) {
        setAssignments(prev =>
          prev.map(a => a.id === assignmentId ? response.data : a)
        );
        addNotification('Checked out successfully', 'success');
      }
    } catch (error) {
      console.error('Check-out failed:', error);
      addNotification('Check-out failed', 'error');
    }
  };

  const handleStaffUpdate = (updatedStaff) => {
    setStaff(prevStaff => 
      prevStaff.map(s => s.id === updatedStaff.id ? updatedStaff : s)
    );
    if (selectedStaff && selectedStaff.id === updatedStaff.id) {
      setSelectedStaff(updatedStaff);
    }
  };

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    const routes = {
      home: '/home',
      staff: '/staff',
      vendors: '/vendors',
      profile: isAdmin() ? '/profile' : '/staff-profile',
      reports: '/reports',
      settings: '/settings',
      contact: '/contact',
      dashboard: '/staff-dashboard',
      assignments: '/assignments',
      checkin: '/checkin'
    };
    navigate(routes[tab] || '/home');
  };

  const handleStaffSelect = (staffId) => {
    setSelectedStaff(staffId);
    navigate(`/staff/${staffId}`);
  };

  // Get navigation items based on user role
  const getNavigationItems = () => {
    const baseItems = [
      { id: 'home', label: 'Home', icon: HomeIcon },
      { id: 'vendors', label: 'Vendors', icon: MapPin },
    ];

    if (isAdmin()) {
      return [
        ...baseItems,
        { id: 'dashboard', label: 'Dashboard', icon: Calendar },
        { id: 'assignments', label: 'Assignments', icon: ClipboardList },
        { id: 'checkin', label: 'Check-In/Out', icon: CheckCircle },
      ];
    }

    return [
      ...baseItems,
      { id: 'profile', label: 'Profile', icon: Users },
    ];
  };

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };



  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white">
      {/* Header - Hidden for staff and vendors pages */}
      {activeTab !== 'staff' && activeTab !== 'vendors' && (
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
              {getNavigationItems().map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => handleNavigation(id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    activeTab === id
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </nav>

            {/* User Info & Logout */}
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
              <span className="text-gray-600 text-sm">
                {user?.username} ({user?.role})
              </span>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-black p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 flex flex-col gap-2">
              {getNavigationItems().map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    handleNavigation(id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    activeTab === id
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
              
              {/* Mobile User Info & Logout */}
              <div className="pt-2 border-t border-gray-200">
                <div className="px-4 py-2 text-gray-600 text-sm">
                  {user?.username} ({user?.role})
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg font-medium transition flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>
      )}

      {/* Notifications */}
      <div className="fixed top-20 right-4 z-40 space-y-2">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`px-4 py-3 rounded-lg shadow-lg text-white flex items-center gap-2 ${
              activeTab === 'home'
                ? 'bg-black'
                : activeTab === 'dashboard'
                ? 'bg-gray-800'
                : 'bg-black'
            }`}
          >
            <Bell className="w-4 h-4" />
            {notif.message}
          </div>
        ))}
      </div>

      {/* Main Content */}
      {activeTab === 'home' ? (
        <Home onNavigate={handleNavigation} />
      ) : activeTab === 'vendors' ? (
        <VendorList />
      ) : activeTab === 'staff' ? (
        <StaffList />
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'profile' && (
            isAdmin() ? (
              <Dashboard />
            ) : (
              <StaffProfile
                staff={selectedStaff || staff[0]}
                onBack={() => handleNavigation('dashboard')}
                onUpdate={handleStaffUpdate}
              />
            )
          )}
          {activeTab === 'assignments' && (
            <StaffAssignment
              assignments={assignments}
              staff={staff}
              vendors={vendors}
              onAssignmentUpdate={setAssignments}
            />
          )}
          {activeTab === 'checkin' && (
            <CheckInOut
              assignments={assignments}
              onCheckIn={handleCheckIn}
              onCheckOut={handleCheckOut}
            />
          )}
          {activeTab === 'contact' && (
            <Contact onNavigate={handleNavigation} />
          )}
        </main>
      )}
      <ColorCustomizer />
    </div>
    </ThemeProvider>
  );
}

export default App;
