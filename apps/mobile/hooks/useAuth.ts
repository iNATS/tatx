import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAppStore } from '@/services/store';
import { authService } from '@/services/api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const { setUser, logout } = useAppStore();

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.login(credentials.email, credentials.password);
      
      if (response.user) {
        setUser(response.user);
        router.replace('/(tabs)');
        return { success: true };
      }
      
      return { success: false, error: 'Invalid credentials' };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to login';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.register(data);
      
      if (response.user) {
        setUser(response.user);
        router.replace('/(tabs)');
        return { success: true };
      }
      
      return { success: false, error: 'Registration failed' };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to register';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      logout();
      router.replace('/login');
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    loading,
    error,
    login,
    register,
    logout: handleLogout,
    clearError,
  };
}
