export const colors = {
  primary: '#0EA5E9', // Sky blue
  'primary-dark': '#0284C7',
  secondary: '#6366F1', // Indigo
  'secondary-dark': '#4F46E5',
  success: '#22C55E', // Green
  'success-dark': '#16A34A',
  warning: '#F59E0B', // Amber
  'warning-dark': '#D97706',
  error: '#EF4444', // Red
  'error-dark': '#DC2626',
  background: {
    light: '#F9FAFB',
    dark: '#111827',
  },
  text: {
    light: {
      primary: '#111827',
      secondary: '#4B5563',
      disabled: '#9CA3AF',
    },
    dark: {
      primary: '#F9FAFB',
      secondary: '#D1D5DB',
      disabled: '#6B7280',
    },
  },
  border: {
    light: '#E5E7EB',
    dark: '#374151',
  },
} as const;

export type Colors = typeof colors; 