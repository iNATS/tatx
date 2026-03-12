'use client';

import { useState, useEffect } from 'react';
import { mockApi, mockUser, mockWallet, mockAddresses, mockNotifications, mockStats } from '../lib/mock-data';

// Use mock data mode
const USE_MOCK_DATA = true;

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session (mock)
    const savedUser = localStorage.getItem('tatx_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      if (USE_MOCK_DATA) {
        const response = await mockApi.login(email, password);
        setUser(response.user);
        localStorage.setItem('tatx_user', JSON.stringify(response.user));
        localStorage.setItem('tatx_token', response.accessToken);
        return response;
      } else {
        // Real API call would go here
        const res = await fetch('http://localhost:3001/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        if (!res.ok) throw new Error('Login failed');
        const response = await res.json();
        setUser(response.user);
        localStorage.setItem('tatx_user', JSON.stringify(response.user));
        localStorage.setItem('tatx_token', response.accessToken);
        return response;
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tatx_user');
    localStorage.removeItem('tatx_token');
  };

  return { user, loading, error, login, logout, isAuthenticated: !!user };
}

export function useWallet() {
  const [wallet, setWallet] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (USE_MOCK_DATA) {
      mockApi.getWallet().then(setWallet).finally(() => setLoading(false));
    }
  }, []);

  return { wallet, loading };
}

export function useAddresses() {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (USE_MOCK_DATA) {
      mockApi.getAddresses().then(setAddresses).finally(() => setLoading(false));
    }
  }, []);

  return { addresses, loading };
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (USE_MOCK_DATA) {
      mockApi.getNotifications().then(setNotifications).finally(() => setLoading(false));
    }
  }, []);

  return { notifications, loading };
}

export function useStats() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (USE_MOCK_DATA) {
      mockApi.getStats().then(setStats).finally(() => setLoading(false));
    }
  }, []);

  return { stats, loading };
}

export function useRides() {
  const [rides, setRides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (USE_MOCK_DATA) {
      mockApi.getRides().then(setRides).finally(() => setLoading(false));
    }
  }, []);

  const createRide = async (rideData: any) => {
    if (USE_MOCK_DATA) {
      return await mockApi.createRide(rideData);
    }
    // Real API call would go here
  };

  const estimateFare = async (pickup: any, dropoff: any, vehicleType: string) => {
    if (USE_MOCK_DATA) {
      return await mockApi.estimateFare(pickup, dropoff, vehicleType);
    }
    // Real API call would go here
  };

  return { rides, loading, createRide, estimateFare };
}

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (USE_MOCK_DATA) {
      mockApi.getRestaurants().then(setRestaurants).finally(() => setLoading(false));
    }
  }, []);

  const getRestaurant = async (id: string) => {
    if (USE_MOCK_DATA) {
      return await mockApi.getRestaurant(id);
    }
    // Real API call would go here
  };

  return { restaurants, loading, getRestaurant };
}

export function useOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (USE_MOCK_DATA) {
      mockApi.getOrders().then(setOrders).finally(() => setLoading(false));
    }
  }, []);

  const createOrder = async (orderData: any) => {
    if (USE_MOCK_DATA) {
      return await mockApi.createOrder(orderData);
    }
    // Real API call would go here
  };

  return { orders, loading, createOrder };
}
