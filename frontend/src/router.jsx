import { createBrowserRouter, Navigate, useNavigate } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import ProfileLayout from './components/ProfileLayout';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';
import StaffDashboard from './components/StaffDashboard';
import StaffProfile from './components/StaffProfile';
import RecordHistory from './components/RecordHistory';
import ProfileSetting from './components/ProfileSetting';
import SupportHelp from './components/SupportHelp';
import StaffAssignment from './components/StaffAssignment';
import VendorList from './components/VendorList';
import ManagerDashboard from './components/ManagerDashboard';
import { AuthProvider } from './context/AuthContext';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import { ThemeProvider } from './context/ThemeContext';

// Manager protected route
const ManagerProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  const userData = JSON.parse(user);
  if (userData.role !== 'manager') {
    return <Navigate to="/home" replace />;
  }
  return children;
};

// Home wrapper component to provide navigation
const HomeWithNavigation = () => {
  const navigate = useNavigate();
  
  const handleNavigate = (tab) => {
    if (tab === 'dashboard') {
      // Check if user is authenticated
      const user = localStorage.getItem('user');
      if (user) {
        navigate('/profile');
      } else {
        navigate('/login');
      }
    } else if (tab === 'contact') {
      navigate('/contact');
    }
  };
  
  return <Home onNavigate={handleNavigate} />;
};

// Contact wrapper component to provide navigation
const ContactWithNavigation = () => {
  const navigate = useNavigate();
  
  const handleNavigate = (tab) => {
    if (tab === 'home') {
      navigate('/home');
    } else if (tab === 'dashboard') {
      // Check if user is authenticated
      const user = localStorage.getItem('user');
      if (user) {
        navigate('/profile');
      } else {
        navigate('/login');
      }
    }
  };
  
  return <Contact onNavigate={handleNavigate} />;
};

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/home" replace />,
  },
  {
    path: '/login',
    element: (
      <AuthProvider>
        <Login />
      </AuthProvider>
    ),
  },
  {
    path: '/register',
    element: (
      <AuthProvider>
        <Register />
      </AuthProvider>
    ),
  },
  {
    path: '/home',
    element: <HomeWithNavigation />,
  },
  {
    path: '/staff-dashboard',
    element: (
      <ThemeProvider>
        <AuthProvider>
          <ProfileLayout>
            <ProtectedRoute>
              <StaffDashboard />
            </ProtectedRoute>
          </ProfileLayout>
        </AuthProvider>
      </ThemeProvider>
    ),
  },
  {
    path: '/profile',
    element: (
      <ThemeProvider>
        <AuthProvider>
          <AdminProtectedRoute>
            <Dashboard />
          </AdminProtectedRoute>
        </AuthProvider>
      </ThemeProvider>
    ),
  },
  {
    path: '/staff-profile',
    element: (
      <ThemeProvider>
        <AuthProvider>
          <ProfileLayout>
            <ProtectedRoute>
              <StaffProfile />
            </ProtectedRoute>
          </ProfileLayout>
        </AuthProvider>
      </ThemeProvider>
    ),
  },
  {
    path: '/reports',
    element: (
      <AuthProvider>
        <ProtectedRoute>
          <App />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: '/settings',
    element: (
      <AuthProvider>
        <ProtectedRoute>
          <App />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: '/record-history',
    element: (
      <ThemeProvider>
        <AuthProvider>
          <ProfileLayout>
            <ProtectedRoute>
              <RecordHistory />
            </ProtectedRoute>
          </ProfileLayout>
        </AuthProvider>
      </ThemeProvider>
    ),
  },
  {
    path: '/profile-setting',
    element: (
      <ThemeProvider>
        <AuthProvider>
          <ProfileLayout>
            <ProtectedRoute>
              <ProfileSetting />
            </ProtectedRoute>
          </ProfileLayout>
        </AuthProvider>
      </ThemeProvider>
    ),
  },
  {
    path: '/support-help',
    element: (
      <ThemeProvider>
        <AuthProvider>
          <ProfileLayout>
            <ProtectedRoute>
              <SupportHelp />
            </ProtectedRoute>
          </ProfileLayout>
        </AuthProvider>
      </ThemeProvider>
    ),
  },
  {
    path: '/staff/:staffId',
    element: (
      <AuthProvider>
        <ProtectedRoute>
          <App />
        </ProtectedRoute>
      </AuthProvider>
    ),
    loader: ({ params }) => {
      // In a real app, this would fetch staff data
      return {
        id: parseInt(params.staffId),
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '+1-555-1001',
        department: 'Food Services',
        startDate: '2023-01-15',
        role: 'Senior Server',
        notes: 'Experienced staff member with excellent customer service skills.'
      };
    }
  },
  {
    path: '/contact',
    element: <ContactWithNavigation />,
  },
  {
    path: '/vendors',
    element: (
      <ThemeProvider>
        <AuthProvider>
          <ProtectedRoute>
            <VendorList />
          </ProtectedRoute>
        </AuthProvider>
      </ThemeProvider>
    ),
  },
  {
    path: '/staff',
    element: (
      <ThemeProvider>
        <AuthProvider>
          <AdminProtectedRoute>
            <App activeTab="staff" />
          </AdminProtectedRoute>
        </AuthProvider>
      </ThemeProvider>
    ),
  },
  {
    path: '/schedule',
    element: (
      <AuthProvider>
        <ProtectedRoute>
          <App />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: '/assignments',
    element: (
      <ThemeProvider>
        <AuthProvider>
          <ProtectedRoute>
            <StaffAssignment />
          </ProtectedRoute>
        </AuthProvider>
      </ThemeProvider>
    ),
  },
  {
    path: '/checkin',
    element: (
      <AuthProvider>
        <ProtectedRoute>
          <App />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: '/manager-dashboard',
    element: (
      <ThemeProvider>
        <AuthProvider>
          <ManagerProtectedRoute>
            <ManagerDashboard />
          </ManagerProtectedRoute>
        </AuthProvider>
      </ThemeProvider>
    ),
  }
]);
