/**
 * Tatx SA Design System
 * Following Apple Human Interface Guidelines for Arabic RTL
 */

export const colors = {
  // Primary brand (Pink/Coral)
  primary: '#DA3C57',
  primaryDark: '#B72249',
  primaryLight: '#F16A82',
  primaryGradient: ['#F16A82', '#DA3C57'],
  
  // Secondary
  secondary: '#F4C7D0',
  accent: '#FF9F0A',
  
  // System semantic colors
  success: '#34C759', // iOS green
  successLight: '#E8F9ED',
  successGradient: ['#5FD37A', '#34C759'],
  error: '#FF3B30', // iOS red
  errorLight: '#FEECEC',
  errorGradient: ['#FF6B60', '#FF3B30'],
  warning: '#FF9500', // iOS orange
  warningLight: '#FFF3E2',
  warningGradient: ['#FFB340', '#FF9F0A'],
  info: '#007AFF', // iOS blue
  infoLight: '#FFF0F3',
  infoGradient: ['#F6B1BE', '#F28CA0'],
  
  // Basic colors
  black: '#000000',
  white: '#FFFFFF',
  
  // Gray scale (iOS system)
  gray: '#8E8E93', // system gray
  grayLight: '#F2F2F7', // system gray 6
  grayLighter: '#FAFAFC',
  grayDark: '#48484A',
  graySeparator: '#C6C6C8', // system gray 4
  
  // Text colors (iOS semantic)
  text: '#000000', // label
  textSecondary: '#3C3C4399', // secondary label (60% opacity)
  textTertiary: '#3C3C4361', // tertiary label (38% opacity)
  textQuaternary: '#3C3C434D', // quaternary label (30% opacity)
  
  // Background colors
  background: '#F2F2F7', // system background
  card: '#FFFFFF', // system card background
  cardSecondary: '#F8EDF0',
  
  // Border colors
  border: '#C6C6C8', // system gray 4
  borderLight: '#E5E5EA', // system gray 5
  
  // Service colors
  green: '#34C759',
  greenLight: '#E8F9ED',
  taxi: '#DA3C57',
  food: '#34C759',
  market: '#F28CA0',
  pharmacy: '#FF3B30',
  grocery: '#D95C73',
  gifts: '#C45586',
  electronics: '#9B5068',
  fashion: '#F16A82',
  
  // Overlay
  overlay: 'rgba(15, 23, 42, 0.45)',
  shadow: 'rgba(0, 0, 0, 0.08)', // iOS standard shadow
  
  // Glass morphism
  glass: 'rgba(255, 255, 255, 0.72)',
  glassBorder: 'rgba(255, 255, 255, 0.55)',
  
  // Fill colors (iOS semantic)
  fillPrimary: '#000000',
  fillSecondary: '#3C3C434D', // 30% opacity
  fillTertiary: '#3C3C431F', // 12% opacity
  fillQuaternary: '#3C3C430C', // 5% opacity
};

export const spacing = {
  xs: 4,   // Half grid (rare)
  sm: 8,   // 1 grid
  md: 16,  // 2 grid
  lg: 24,  // 3 grid
  xl: 32,  // 4 grid
  xxl: 48, // 6 grid
  xxxl: 64, // 8 grid
};

export const fonts = {
  regular: 'Cairo_400Regular',
  semiBold: 'Cairo_600SemiBold',
  bold: 'Cairo_700Bold',
  family: 'Cairo_400Regular',
};

/**
 * Apple HIG Typography for Arabic
 * Based on SF Arabic font metrics
 * Using Cairo as alternative Arabic font
 */
export const typography = {
  // Large Title (Page headers) - 34pt
  largeTitle: {
    fontSize: 34,
    lineHeight: 41,
    fontFamily: fonts.bold,
    letterSpacing: 0, // Arabic doesn't use letter-spacing
    writingDirection: 'rtl',
  },
  
  // Title 1 (Section headers) - 28pt
  title1: {
    fontSize: 28,
    lineHeight: 34,
    fontFamily: fonts.bold,
    letterSpacing: 0,
    writingDirection: 'rtl',
  },
  
  // Title 2 (Card titles) - 22pt
  title2: {
    fontSize: 22,
    lineHeight: 28,
    fontFamily: fonts.semiBold,
    letterSpacing: 0,
    writingDirection: 'rtl',
  },
  
  // Title 3 (Subtitles) - 20pt
  title3: {
    fontSize: 20,
    lineHeight: 25,
    fontFamily: fonts.semiBold,
    letterSpacing: 0,
    writingDirection: 'rtl',
  },
  
  // Headline (Important text) - 17pt
  headline: {
    fontSize: 17,
    lineHeight: 22,
    fontFamily: fonts.semiBold,
    letterSpacing: 0,
    writingDirection: 'rtl',
  },
  
  // Body (Main content) - 17pt
  body: {
    fontSize: 17,
    lineHeight: 24, // 1.4x for Arabic readability
    fontFamily: fonts.regular,
    letterSpacing: 0,
    writingDirection: 'rtl',
  },
  
  // Callout (Secondary content) - 16pt
  callout: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: fonts.regular,
    letterSpacing: 0,
    writingDirection: 'rtl',
  },
  
  // Subhead (Captions, labels) - 15pt
  subhead: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: fonts.regular,
    letterSpacing: 0,
    writingDirection: 'rtl',
  },
  
  // Footnote (Small text) - 13pt
  footnote: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: fonts.regular,
    letterSpacing: 0,
    writingDirection: 'rtl',
  },
  
  // Caption 1 - 12pt
  caption1: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fonts.regular,
    letterSpacing: 0,
    writingDirection: 'rtl',
  },
  
  // Caption 2 - 11pt
  caption2: {
    fontSize: 11,
    lineHeight: 13,
    fontFamily: fonts.regular,
    letterSpacing: 0,
    writingDirection: 'rtl',
  },
  
  // Button - 17pt
  button: {
    fontSize: 17,
    lineHeight: 22,
    fontFamily: fonts.semiBold,
    letterSpacing: 0,
    writingDirection: 'rtl',
  },
};

export const borderRadius = {
  sm: 8,   // Small radius (buttons, inputs)
  md: 10,  // Medium radius (cards)
  lg: 12,  // Large radius (modals)
  xl: 16,  // Extra large (hero cards)
  xxl: 24, // Hero elements
  full: 9999, // Circular (pills, avatars)
};

export const shadows = {
  // No shadows - Apple HIG iOS 26+ flat design
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
};
