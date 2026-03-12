import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

interface AppState {
  // User
  user: User | null;
  isAuthenticated: boolean;
  
  // Language
  language: 'en' | 'ar';
  
  // Location
  currentLocation: {
    latitude: number;
    longitude: number;
    address?: string;
  } | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setLanguage: (language: 'en' | 'ar') => void;
  setCurrentLocation: (location: {
    latitude: number;
    longitude: number;
    address?: string;
  } | null) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial State
  user: null,
  isAuthenticated: false,
  language: 'en',
  currentLocation: null,
  
  // Actions
  setUser: (user) => set({ 
    user, 
    isAuthenticated: !!user 
  }),
  
  setLanguage: (language) => set({ language }),
  
  setCurrentLocation: (location) => set({ currentLocation: location }),
  
  logout: () => set({ 
    user: null, 
    isAuthenticated: false,
    currentLocation: null,
  }),
}));
