export const colors = {
  primary: '#E91E63',
  primaryDark: '#C2185B',
  primaryLight: '#F48FB1',
  secondary: '#FF4081',
  accent: '#FF5722',
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',
  info: '#2196F3',
  black: '#000000',
  white: '#FFFFFF',
  gray: '#9E9E9E',
  grayLight: '#F5F5F5',
  grayDark: '#424242',
  text: '#212121',
  textSecondary: '#757575',
  border: '#E0E0E0',
  background: '#FAFAFA',
  card: '#FFFFFF',
  green: '#4CAF50',
  greenLight: '#C8E6C9',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const fonts = {
  regular: 'Cairo',
  semiBold: 'Cairo',
  bold: 'Cairo',
  family: 'Cairo',
};

export const typography = {
  h1: {
    fontSize: 32,
    fontFamily: fonts.bold,
    fontWeight: '700',
  },
  h2: {
    fontSize: 24,
    fontFamily: fonts.bold,
    fontWeight: '700',
  },
  h3: {
    fontSize: 20,
    fontFamily: fonts.semiBold,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    fontFamily: fonts.regular,
    fontWeight: '400',
  },
  bodySmall: {
    fontSize: 14,
    fontFamily: fonts.regular,
    fontWeight: '400',
  },
  caption: {
    fontSize: 12,
    fontFamily: fonts.regular,
    fontWeight: '400',
  },
  button: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    fontWeight: '600',
  },
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};
