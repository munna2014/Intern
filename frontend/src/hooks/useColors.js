import { useTheme } from '../context/ThemeContext';

/**
 * Custom hook to access and use theme colors
 * Provides convenient methods to get colors and component styles
 */
export function useColors() {
  const { theme } = useTheme();

  return {
    // Primary Colors
    primaryLight: theme.colors.primary.light,
    primaryMain: theme.colors.primary.main,
    primaryDark: theme.colors.primary.dark,
    primaryDarker: theme.colors.primary.darker,

    // Secondary Colors
    secondaryLight: theme.colors.secondary.light,
    secondaryMain: theme.colors.secondary.main,
    secondaryDark: theme.colors.secondary.dark,

    // Neutral Colors
    white: theme.colors.neutral.white,
    gray50: theme.colors.neutral.gray50,
    gray100: theme.colors.neutral.gray100,
    gray200: theme.colors.neutral.gray200,
    gray300: theme.colors.neutral.gray300,
    gray400: theme.colors.neutral.gray400,
    gray500: theme.colors.neutral.gray500,
    gray600: theme.colors.neutral.gray600,
    gray700: theme.colors.neutral.gray700,
    gray800: theme.colors.neutral.gray800,
    gray900: theme.colors.neutral.gray900,

    // Status Colors
    successLight: theme.colors.status.success.light,
    successMain: theme.colors.status.success.main,
    successDark: theme.colors.status.success.dark,

    warningLight: theme.colors.status.warning.light,
    warningMain: theme.colors.status.warning.main,
    warningDark: theme.colors.status.warning.dark,

    errorLight: theme.colors.status.error.light,
    errorMain: theme.colors.status.error.main,
    errorDark: theme.colors.status.error.dark,

    infoLight: theme.colors.status.info.light,
    infoMain: theme.colors.status.info.main,
    infoDark: theme.colors.status.info.dark,

    // Semantic Colors
    background: theme.colors.semantic.background,
    surface: theme.colors.semantic.surface,
    border: theme.colors.semantic.border,
    text: theme.colors.semantic.text,
    textSecondary: theme.colors.semantic.textSecondary,
    textTertiary: theme.colors.semantic.textTertiary,

    // Gradients
    gradients: theme.gradients,

    // Component Styles
    componentStyles: theme.componentStyles,

    // Get color by path
    getColor: (path) => {
      const keys = path.split('.');
      let value = theme.colors;
      for (const key of keys) {
        value = value[key];
      }
      return value;
    },

    // Get component style
    getComponentStyle: (component, variant = 'default') => {
      return theme.componentStyles[component]?.[variant] || '';
    },
  };
}

export default useColors;
