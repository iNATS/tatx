/**
 * Tatx Brand Colors
 * Primary: #0F172A (Slate 900)
 * Accent: #22C55E (Green 500)
 */

export const Colors = {
  // Brand Colors
  primary: '#0F172A',
  primaryLight: '#1E293B',
  accent: '#22C55E',
  accentDark: '#16A34A',
  accentLight: '#86EFAC',
  
  // Background Colors
  background: '#F8FAFC',
  backgroundSecondary: '#FFFFFF',
  backgroundMuted: '#F1F5F9',
  
  // Text Colors
  text: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#94A3B8',
  textInverse: '#FFFFFF',
  
  // Border Colors
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  
  // Status Colors
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Service Colors
  ride: '#3B82F6',
  food: '#F97316',
  grocery: '#22C55E',
  courier: '#8B5CF6',
  
  // Tab Bar
  tabActive: '#0F172A',
  tabInactive: '#94A3B8',
  tabBackground: '#FFFFFF',
  
  // Transparent
  transparent: 'transparent',
  overlay: 'rgba(15, 23, 42, 0.5)',
  overlayLight: 'rgba(15, 23, 42, 0.1)',
};

export const Gradients = {
  primary: ['#0F172A', '#1E293B'],
  accent: ['#22C55E', '#16A34A'],
  ride: ['#3B82F6', '#2563EB'],
  food: ['#F97316', '#EA580C'],
  grocery: ['#22C55E', '#16A34A'],
  courier: ['#8B5CF6', '#7C3AED'],
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};
