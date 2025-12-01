// MASA AI Dynamic Color Configuration
export const colorConfig = {
  // Primary Colors (Orange to Red Gradient)
  primary: {
    light: '#fff7ed',      // orange-50
    main: '#f97316',       // orange-500
    dark: '#ea580c',       // orange-600
    darker: '#c2410c',     // orange-700
  },
  
  secondary: {
    light: '#fecaca',      // red-200
    main: '#dc2626',       // red-600
    dark: '#b91c1c',       // red-700
  },
  
  // Neutral Colors
  neutral: {
    white: '#ffffff',
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray400: '#9ca3af',
    gray500: '#6b7280',
    gray600: '#4b5563',
    gray700: '#374151',
    gray800: '#1f2937',
    gray900: '#111827',
  },
  
  // Status Colors
  status: {
    success: {
      light: '#dcfce7',     // green-100
      main: '#22c55e',      // green-500
      dark: '#16a34a',      // green-600
    },
    warning: {
      light: '#fef3c7',     // yellow-100
      main: '#eab308',      // yellow-400
      dark: '#ca8a04',      // yellow-600
    },
    error: {
      light: '#fee2e2',     // red-100
      main: '#ef4444',      // red-500
      dark: '#dc2626',      // red-600
    },
    info: {
      light: '#dbeafe',     // blue-100
      main: '#3b82f6',      // blue-500
      dark: '#1d4ed8',      // blue-600
    },
  },
  
  // Semantic Colors
  semantic: {
    background: '#ffffff',
    surface: '#f9fafb',
    border: '#e5e7eb',
    text: '#111827',
    textSecondary: '#6b7280',
    textTertiary: '#9ca3af',
  },
};

// Gradient Combinations
export const gradients = {
  primary: 'from-orange-500 to-red-600',
  primaryHover: 'from-orange-600 to-red-700',
  primaryReverse: 'from-red-600 to-orange-500',
  subtle: 'from-orange-50 to-red-50',
};

// Shadow Definitions
export const shadows = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
};

// Border Radius
export const radius = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
};

// Spacing
export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '2.5rem',
};

// Typography
export const typography = {
  heading: {
    xl: 'text-4xl font-bold',
    lg: 'text-3xl font-bold',
    md: 'text-2xl font-bold',
    sm: 'text-xl font-bold',
  },
  body: {
    lg: 'text-lg',
    md: 'text-base',
    sm: 'text-sm',
    xs: 'text-xs',
  },
};

// Component Presets
export const componentStyles = {
  button: {
    primary: 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg',
    secondary: 'bg-white border border-orange-500 text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-lg font-semibold transition-all',
    tertiary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 px-6 py-3 rounded-lg font-semibold transition-all',
  },
  card: {
    default: 'bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow',
    elevated: 'bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow',
    filled: 'bg-orange-50 border border-orange-200 rounded-xl p-6 shadow-sm',
  },
  input: {
    default: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent',
  },
};

export default colorConfig;
