import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { useAppStore } from '@/services/store';

export function useLocation() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const setCurrentLocation = useAppStore((state) => state.setCurrentLocation);

  const requestPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission denied');
        return false;
      }
      return true;
    } catch (err) {
      setError('Failed to request location permission');
      return false;
    }
  };

  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      setError(null);

      const hasPermission = await requestPermission();
      if (!hasPermission) {
        setLoading(false);
        return null;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      const locationData = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: address[0]
          ? `${address[0].name || ''} ${address[0].street || ''} ${
              address[0].city || ''
            }`.trim()
          : undefined,
      };

      setCurrentLocation(locationData);
      setLoading(false);
      return locationData;
    } catch (err) {
      setError('Failed to get current location');
      setLoading(false);
      return null;
    }
  };

  const watchLocation = () => {
    let subscription: Location.LocationSubscription | null = null;

    const startWatching = async () => {
      const hasPermission = await requestPermission();
      if (!hasPermission) return;

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        async (location) => {
          const address = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });

          setCurrentLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            address: address[0]
              ? `${address[0].name || ''} ${address[0].street || ''} ${
                  address[0].city || ''
                }`.trim()
              : undefined,
          });
        }
      );
    };

    startWatching();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return {
    loading,
    error,
    getCurrentLocation,
    watchLocation,
  };
}
