import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/staff-profile" replace />;
  }

  return children;
};

export default AdminProtectedRoute;