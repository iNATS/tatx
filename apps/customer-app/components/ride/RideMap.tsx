'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Loader2, MapPin, Navigation } from 'lucide-react';
import { cn } from '@tatx/ui/utils/cn';
import type { RideMapProps } from '@/types/ride-booking';
import type { Coordinates } from '@tatx/types';

// Mapbox GL JS types (for when Mapbox is installed)
declare const mapboxgl: unknown;

/**
 * RideMap Component
 * Interactive map with Mapbox GL showing route, pickup, and dropoff locations
 * 
 * Note: Requires Mapbox GL JS and a valid access token.
 * For demo purposes, this component includes a fallback static map view.
 */
export function RideMap({
  pickupLocation,
  dropoffLocation,
  routePolyline,
  driverLocation,
  onMapClick,
  showTraffic = false,
  interactive = true,
  height = '100%',
}: RideMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [useFallback, setUseFallback] = useState(true);

  // Default center (Dubai)
  const defaultCenter: Coordinates = {
    latitude: 25.2048,
    longitude: 55.2708,
  };

  // Initialize Mapbox map
  useEffect(() => {
    const initMap = async () => {
      try {
        // Check if Mapbox is available
        if (typeof window === 'undefined' || typeof mapboxgl === 'undefined') {
          setUseFallback(true);
          setIsMapLoaded(true);
          return;
        }

        // Get Mapbox token from environment
        const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
        if (!mapboxToken) {
          console.warn('Mapbox token not found. Using fallback map.');
          setUseFallback(true);
          setIsMapLoaded(true);
          return;
        }

        // Initialize Mapbox (this would work when mapbox-gl is installed)
        // const map = new mapboxgl.Map({
        //   container: mapContainerRef.current!,
        //   style: 'mapbox://styles/mapbox/streets-v12',
        //   center: [defaultCenter.longitude, defaultCenter.latitude],
        //   zoom: 12,
        //   interactive,
        // });

        // For now, use fallback
        setUseFallback(true);
        setIsMapLoaded(true);
      } catch (error) {
        console.error('Error initializing map:', error);
        setMapError('Failed to load map');
        setUseFallback(true);
        setIsMapLoaded(true);
      }
    };

    initMap();
  }, [interactive]);

  // Calculate bounds to fit both locations
  const getBounds = useCallback(() => {
    if (!pickupLocation && !dropoffLocation) {
      return null;
    }

    const locations: Coordinates[] = [];
    if (pickupLocation) {
      locations.push({
        latitude: pickupLocation.latitude,
        longitude: pickupLocation.longitude,
      });
    }
    if (dropoffLocation) {
      locations.push({
        latitude: dropoffLocation.latitude,
        longitude: dropoffLocation.longitude,
      });
    }

    if (locations.length === 0) return null;

    const minLat = Math.min(...locations.map((l) => l.latitude));
    const maxLat = Math.max(...locations.map((l) => l.latitude));
    const minLng = Math.min(...locations.map((l) => l.longitude));
    const maxLng = Math.max(...locations.map((l) => l.longitude));

    // Add padding
    const latPadding = (maxLat - minLat) * 0.2 || 0.05;
    const lngPadding = (maxLng - minLng) * 0.2 || 0.05;

    return {
      south: minLat - latPadding,
      north: maxLat + latPadding,
      west: minLng - lngPadding,
      east: maxLng + lngPadding,
    };
  }, [pickupLocation, dropoffLocation]);

  // Handle map click
  const handleMapClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!onMapClick || !interactive || !mapContainerRef.current) return;

      const rect = mapContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Convert pixel coordinates to approximate lat/lng (simplified)
      const bounds = getBounds();
      if (bounds) {
        const lng = bounds.west + (x / rect.width) * (bounds.east - bounds.west);
        const lat =
          bounds.north - (y / rect.height) * (bounds.north - bounds.south);

        onMapClick({ latitude: lat, longitude: lng });
      }
    },
    [onMapClick, interactive, getBounds]
  );

  // Calculate center point
  const getCenter = (): Coordinates => {
    if (pickupLocation && dropoffLocation) {
      return {
        latitude:
          (pickupLocation.latitude + dropoffLocation.latitude) / 2,
        longitude:
          (pickupLocation.longitude + dropoffLocation.longitude) / 2,
      };
    }
    if (pickupLocation) return pickupLocation;
    if (dropoffLocation) return dropoffLocation;
    return defaultCenter;
  };

  const center = getCenter();

  // Generate static map URL (fallback)
  const getStaticMapUrl = () => {
    const zoom = pickupLocation && dropoffLocation ? 11 : 13;
    return `https://maps.googleapis.com/maps/api/staticmap?center=${center.latitude},${center.longitude}&zoom=${zoom}&size=${
      mapContainerRef.current?.offsetWidth || 600
    }x${mapContainerRef.current?.offsetHeight || 400}&maptype=roadmap&key=YOUR_API_KEY`;
  };

  if (!isMapLoaded) {
    return (
      <div
        className="w-full bg-gray-100 flex items-center justify-center"
        style={{ height }}
      >
        <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
      </div>
    );
  }

  return (
    <div
      ref={mapContainerRef}
      className={cn(
        'w-full relative bg-gray-100 overflow-hidden',
        interactive && 'cursor-crosshair'
      )}
      style={{ height }}
      onClick={handleMapClick}
    >
      {/* Fallback Map Display */}
      {useFallback && (
        <div className="w-full h-full relative">
          {/* Map Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
            {/* Grid pattern to simulate map */}
            <svg
              className="absolute inset-0 w-full h-full opacity-20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-gray-400"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Simulated roads */}
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-300 transform -rotate-12" />
              <div className="absolute top-0 bottom-0 left-1/3 w-2 bg-gray-300 transform rotate-6" />
              <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-300 transform rotate-3" />
              <div className="absolute top-0 bottom-0 right-1/4 w-1 bg-gray-300 transform -rotate-6" />
            </div>
          </div>

          {/* Pickup Marker */}
          {pickupLocation && (
            <div
              className="absolute transform -translate-x-1/2 -translate-y-full"
              style={{
                left: '30%',
                top: '50%',
              }}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-brand-600 rotate-45 border-r border-b border-white" />
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded shadow text-xs font-medium">
                  Pickup
                </div>
              </div>
            </div>
          )}

          {/* Dropoff Marker */}
          {dropoffLocation && (
            <div
              className="absolute transform -translate-x-1/2 -translate-y-full"
              style={{
                left: '70%',
                top: '50%',
              }}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <Navigation className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-600 rotate-45 border-r border-b border-white" />
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded shadow text-xs font-medium">
                  Dropoff
                </div>
              </div>
            </div>
          )}

          {/* Driver Marker */}
          {driverLocation && (
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
              style={{
                left: '50%',
                top: '50%',
              }}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                <Navigation className="h-4 w-4 text-white transform -rotate-45" />
              </div>
            </div>
          )}

          {/* Route Line (simulated) */}
          {pickupLocation && dropoffLocation && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line
                x1="30%"
                y1="50%"
                x2="70%"
                y2="50%"
                stroke="url(#routeGradient)"
                strokeWidth="4"
                strokeDasharray="8,4"
                fill="none"
              />
              <defs>
                <linearGradient
                  id="routeGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {/* Map Controls */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <button
              className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              title="Zoom In"
            >
              <span className="text-xl font-bold text-gray-700">+</span>
            </button>
            <button
              className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              title="Zoom Out"
            >
              <span className="text-xl font-bold text-gray-700">−</span>
            </button>
          </div>

          {/* Traffic Toggle */}
          {showTraffic && (
            <div className="absolute top-4 right-4">
              <button className="px-3 py-2 bg-white rounded-lg shadow-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Traffic: On
              </button>
            </div>
          )}
        </div>
      )}

      {/* Error State */}
      {mapError && (
        <div className="absolute inset-0 bg-white/90 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-red-400 mx-auto mb-2" />
            <p className="text-gray-600 font-medium">{mapError}</p>
            <p className="text-gray-400 text-sm mt-1">
              Please check your connection
            </p>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {!isMapLoaded && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
        </div>
      )}
    </div>
  );
}

export default RideMap;
