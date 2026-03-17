export const colors = {
  // Primary Colors
  primary: '#E91E63',
  primaryDark: '#C2185B',
  primaryLight: '#F48FB1',
  primaryGradient: ['#E91E63', '#FF4081'],
  
  // Secondary Colors
  secondary: '#FF4081',
  accent: '#FF5722',
  
  // Status Colors
  success: '#10B981',
  successLight: '#D1FAE5',
  successGradient: ['#10B981', '#34D399'],
  error: '#EF4444',
  errorLight: '#FEE2E2',
  errorGradient: ['#EF4444', '#F87171'],
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  warningGradient: ['#F59E0B', '#FBBF24'],
  info: '#3B82F6',
  infoLight: '#DBEAFE',
  infoGradient: ['#3B82F6', '#60A5FA'],
  
  // Neutral Colors
  black: '#000000',
  white: '#FFFFFF',
  gray: '#9E9E9E',
  grayLight: '#F3F4F6',
  grayLighter: '#F9FAFB',
  grayDark: '#4B5563',
  
  // Text Colors
  text: '#1F2937',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  
  // Background Colors
  background: '#F9FAFB',
  card: '#FFFFFF',
  cardSecondary: '#F3F4F6',
  
  // Border Colors
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  
  // Special
  green: '#10B981',
  greenLight: '#D1FAE5',
  overlay: 'rgba(0, 0, 0, 0.5)',
  shadow: 'rgba(0, 0, 0, 0.1)',
  
  // Brand Colors for Services
  taxi: '#E91E63',
  food: '#10B981',
  market: '#3B82F6',
  pharmacy: '#EF4444',
  grocery: '#10B981',
  gifts: '#F59E0B',
  electronics: '#FF4081',
  fashion: '#FF5722',
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
  // Display - for hero sections
  display: {
    fontSize: 36,
    fontFamily: fonts.bold,
    fontWeight: '800',
    lineHeight: 44,
  },
  // H1 - Page titles
  h1: {
    fontSize: 28,
    fontFamily: fonts.bold,
    fontWeight: '700',
    lineHeight: 36,
  },
  // H2 - Section titles
  h2: {
    fontSize: 22,
    fontFamily: fonts.bold,
    fontWeight: '700',
    lineHeight: 28,
  },
  // H3 - Card titles
  h3: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    fontWeight: '600',
    lineHeight: 24,
  },
  // Body - Main content
  body: {
    fontSize: 16,
    fontFamily: fonts.regular,
    fontWeight: '400',
    lineHeight: 24,
  },
  // Body Small - Secondary content
  bodySmall: {
    fontSize: 14,
    fontFamily: fonts.regular,
    fontWeight: '400',
    lineHeight: 20,
  },
  // Caption - Labels and hints
  caption: {
    fontSize: 12,
    fontFamily: fonts.regular,
    fontWeight: '400',
    lineHeight: 16,
  },
  // Button - Action text
  button: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    fontWeight: '600',
    lineHeight: 24,
  },
  // Label - Form labels
  label: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    fontWeight: '600',
    lineHeight: 20,
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
  // Subtle shadow for cards
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  // Medium shadow for elevated cards
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  // Large shadow for modals and floating elements
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },
  // Extra large shadow for hero elements
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  // Floating action button shadow
  float: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
};
