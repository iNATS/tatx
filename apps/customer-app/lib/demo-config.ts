// Demo Mode Configuration
// Enable/disable mock data for demo purposes

export const DEMO_MODE = {
  enabled: true,
  
  // Show demo banner
  showBanner: true,
  
  // Demo credentials
  credentials: {
    email: 'demo@tatx.sa',
    password: 'demo123',
  },
  
  // Features to mock
  mockFeatures: {
    auth: true,
    rides: true,
    food: true,
    orders: true,
    wallet: true,
    notifications: true,
  },
  
  // Auto-login for demo
  autoLogin: true,
  
  // Demo user
  demoUser: {
    id: 'demo-user-1',
    email: 'demo@tatx.sa',
    firstName: 'Demo',
    lastName: 'User',
    role: 'CUSTOMER',
  },
};

// Environment-based configuration
export const isDemoMode = () => {
  // Check environment variable
  if (typeof window !== 'undefined') {
    return localStorage.getItem('tatx_demo_mode') === 'true' || DEMO_MODE.enabled;
  }
  return DEMO_MODE.enabled;
};

// Toggle demo mode
export const toggleDemoMode = (enabled: boolean) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('tatx_demo_mode', enabled ? 'true' : 'false');
    window.location.reload();
  }
};
