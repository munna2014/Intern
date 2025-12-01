import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      console.log('Login attempt:', { username });
      const response = await authService.login(username, password);
      console.log('Login response:', response);
      
      if (response.success) {
        setUser(response.data.user);
        return { success: true, user: response.data.user };
      }
      return {
        success: false,
        error: response.error?.message || 'Login failed',
        details: response.error?.details || null,
      };
    } catch (error) {
      // Help debug shape of error coming from API
      // eslint-disable-next-line no-console
      console.error('Login error from API:', error);
      // Axios interceptor rejects with the response data directly
      const message =
        error?.error?.message ||
        error?.message ||
        'Login failed';

      return {
        success: false,
        error: message,
        details: error?.error?.details || null,
      };
    }
  };

  const register = async (username, email, password, role = 'staff') => {
    try {
      const response = await authService.register(username, email, password, role);
      if (response.success) {
        setUser(response.data.user);
        return { success: true, user: response.data.user };
      }
      return {
        success: false,
        error: response.error?.message || 'Registration failed',
        details: response.error?.details || null,
      };
    } catch (error) {
      // Help debug shape of error coming from API
      // eslint-disable-next-line no-console
      console.error('Register error from API:', error);
      // Axios interceptor rejects with the response data directly
      const message =
        error?.error?.message ||
        error?.message ||
        'Registration failed';

      return {
        success: false,
        error: message,
        details: error?.error?.details || null,
      };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    setUser(null);
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAdmin,
    isLoading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
