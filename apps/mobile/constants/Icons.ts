import { Colors } from './Colors';

export const Icons = {
  ride: {
    name: 'car' as const,
    color: Colors.ride,
  },
  food: {
    name: 'utensils' as const,
    color: Colors.food,
  },
  grocery: {
    name: 'shopping-cart' as const,
    color: Colors.grocery,
  },
  courier: {
    name: 'package' as const,
    color: Colors.courier,
  },
  home: {
    name: 'home' as const,
    color: Colors.tabActive,
  },
  profile: {
    name: 'user' as const,
    color: Colors.tabActive,
  },
  location: {
    name: 'map-pin' as const,
    color: Colors.primary,
  },
  search: {
    name: 'search' as const,
    color: Colors.textMuted,
  },
  bell: {
    name: 'bell' as const,
    color: Colors.primary,
  },
  wallet: {
    name: 'wallet' as const,
    color: Colors.accent,
  },
  history: {
    name: 'clock' as const,
    color: Colors.primary,
  },
  settings: {
    name: 'settings' as const,
    color: Colors.primary,
  },
  support: {
    name: 'headphones' as const,
    color: Colors.primary,
  },
  logout: {
    name: 'log-out' as const,
    color: Colors.error,
  },
  chevronRight: {
    name: 'chevron-right' as const,
    color: Colors.textMuted,
  },
  star: {
    name: 'star' as const,
    color: Colors.warning,
  },
};

export type IconName = keyof typeof Icons;
