import axios from 'axios';
import { useAppStore } from './store';

// Base API URL - should be configured via environment variables
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = useAppStore.getState().user; // You can store token separately
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - logout user
      useAppStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

// API Services
export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
  
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
  
  refreshToken: async () => {
    const response = await api.post('/auth/refresh');
    return response.data;
  },
};

export const rideService = {
  getVehicleTypes: async () => {
    const response = await api.get('/rides/vehicles');
    return response.data;
  },
  
  estimateFare: async (pickup: string, dropoff: string, vehicleType: string) => {
    const response = await api.post('/rides/estimate', {
      pickup,
      dropoff,
      vehicleType,
    });
    return response.data;
  },
  
  bookRide: async (data: {
    pickup: string;
    dropoff: string;
    vehicleType: string;
    paymentMethod: string;
  }) => {
    const response = await api.post('/rides/book', data);
    return response.data;
  },
  
  getActiveRide: async () => {
    const response = await api.get('/rides/active');
    return response.data;
  },
  
  cancelRide: async (rideId: string) => {
    const response = await api.post(`/rides/${rideId}/cancel`);
    return response.data;
  },
  
  getRideHistory: async () => {
    const response = await api.get('/rides/history');
    return response.data;
  },
};

export const foodService = {
  getRestaurants: async (params?: {
    cuisine?: string;
    search?: string;
    limit?: number;
  }) => {
    const response = await api.get('/restaurants', { params });
    return response.data;
  },
  
  getRestaurant: async (id: string) => {
    const response = await api.get(`/restaurants/${id}`);
    return response.data;
  },
  
  getMenu: async (restaurantId: string) => {
    const response = await api.get(`/restaurants/${restaurantId}/menu`);
    return response.data;
  },
  
  placeOrder: async (data: {
    restaurantId: string;
    items: Array<{ itemId: string; quantity: number }>;
    deliveryAddress: string;
    paymentMethod: string;
  }) => {
    const response = await api.post('/orders', data);
    return response.data;
  },
  
  getOrderHistory: async () => {
    const response = await api.get('/orders/history');
    return response.data;
  },
};

export const userService = {
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },
  
  updateProfile: async (data: {
    name?: string;
    email?: string;
    phone?: string;
  }) => {
    const response = await api.put('/users/profile', data);
    return response.data;
  },
  
  getWallet: async () => {
    const response = await api.get('/users/wallet');
    return response.data;
  },
  
  addWalletFunds: async (amount: number) => {
    const response = await api.post('/users/wallet/topup', { amount });
    return response.data;
  },
  
  getSavedAddresses: async () => {
    const response = await api.get('/users/addresses');
    return response.data;
  },
  
  addAddress: async (data: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    type: 'home' | 'work' | 'other';
  }) => {
    const response = await api.post('/users/addresses', data);
    return response.data;
  },
  
  deleteAddress: async (addressId: string) => {
    const response = await api.delete(`/users/addresses/${addressId}`);
    return response.data;
  },
};

export default api;
