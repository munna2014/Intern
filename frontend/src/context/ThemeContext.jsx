import React, { createContext, useContext, useState, useCallback } from 'react';
import { colorConfig, gradients, componentStyles } from '../config/colors';

// Create Theme Context
const ThemeContext = createContext();

// Theme Provider Component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState({
    colors: colorConfig,
    gradients: gradients,
    componentStyles: componentStyles,
    mode: 'light', // 'light' or 'dark'
  });

  // Update theme colors dynamically
  const updateColors = useCallback((newColors) => {
    setTheme((prev) => ({
      ...prev,
      colors: { ...prev.colors, ...newColors },
    }));
  }, []);

  // Update specific color
  const updateColor = useCallback((path, value) => {
    setTheme((prev) => {
      const keys = path.split('.');
      const newColors = JSON.parse(JSON.stringify(prev.colors));
      
      let current = newColors;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      
      return {
        ...prev,
        colors: newColors,
      };
    });
  }, []);

  // Toggle theme mode
  const toggleMode = useCallback(() => {
    setTheme((prev) => ({
      ...prev,
      mode: prev.mode === 'light' ? 'dark' : 'light',
    }));
  }, []);

  // Reset to default theme
  const resetTheme = useCallback(() => {
    setTheme({
      colors: colorConfig,
      gradients: gradients,
      componentStyles: componentStyles,
      mode: 'light',
    });
  }, []);

  const value = {
    theme,
    updateColors,
    updateColor,
    toggleMode,
    resetTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom Hook to use Theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;
