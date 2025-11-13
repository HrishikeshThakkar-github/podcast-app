export const theme = {
  colors: {
    primary: '#4A90E2',
    primaryDark: '#357ABD',
    secondary: '#6B7C93',
    background: '#F7F9FC',
    surface: '#FFFFFF',
    border: '#E4E9F0',
    text: {
      primary: '#1A1F36',
      secondary: '#6B7C93',
      disabled: '#A3ACB9',
      inverse: '#FFFFFF',
    },
    error: '#E25149',
  },
  spacing: (multiplier: number) => `${multiplier * 0.5}rem`,
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
  },
};
