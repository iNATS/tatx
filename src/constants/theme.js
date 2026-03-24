export const colors = {
  primary: '#DA3C57',
  primaryDark: '#B72249',
  primaryLight: '#F16A82',
  primaryGradient: ['#F16A82', '#DA3C57'],
  secondary: '#F4C7D0',
  accent: '#FF9F0A',
  success: '#34C759',
  successLight: '#E8F9ED',
  successGradient: ['#5FD37A', '#34C759'],
  error: '#FF453A',
  errorLight: '#FEECEC',
  errorGradient: ['#FF6B60', '#FF453A'],
  warning: '#FF9F0A',
  warningLight: '#FFF3E2',
  warningGradient: ['#FFB340', '#FF9F0A'],
  info: '#F28CA0',
  infoLight: '#FFF0F3',
  infoGradient: ['#F6B1BE', '#F28CA0'],
  black: '#000000',
  white: '#FFFFFF',
  gray: '#8E8E93',
  grayLight: '#F2F2F7',
  grayLighter: '#FAFAFC',
  grayDark: '#48484A',
  text: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  background: '#FBF6F8',
  card: '#FFFFFF',
  cardSecondary: '#F8EDF0',
  border: '#F0D9DF',
  borderLight: '#F6E8EC',
  green: '#34C759',
  greenLight: '#E8F9ED',
  overlay: 'rgba(15, 23, 42, 0.45)',
  shadow: 'rgba(15, 23, 42, 0.08)',
  taxi: '#DA3C57',
  food: '#34C759',
  market: '#F28CA0',
  pharmacy: '#FF453A',
  grocery: '#D95C73',
  gifts: '#C45586',
  electronics: '#9B5068',
  fashion: '#F16A82',
  glass: 'rgba(255, 255, 255, 0.72)',
  glassBorder: 'rgba(255, 255, 255, 0.55)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const fonts = {
  regular: 'Cairo_400Regular',
  semiBold: 'Cairo_600SemiBold',
  bold: 'Cairo_700Bold',
  family: 'Cairo_400Regular',
};

export const typography = {
  display: {
    fontSize: 34,
    fontFamily: fonts.bold,
    lineHeight: 42,
  },
  h1: {
    fontSize: 28,
    fontFamily: fonts.bold,
    lineHeight: 36,
  },
  h2: {
    fontSize: 22,
    fontFamily: fonts.bold,
    lineHeight: 30,
  },
  h3: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    lineHeight: 26,
  },
  body: {
    fontSize: 16,
    fontFamily: fonts.regular,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontFamily: fonts.regular,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    lineHeight: 22,
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
  },
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 18,
  xl: 24,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  md: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 5,
  },
  lg: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
  xl: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.16,
    shadowRadius: 32,
    elevation: 10,
  },
  float: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 28,
    elevation: 12,
  },
};
