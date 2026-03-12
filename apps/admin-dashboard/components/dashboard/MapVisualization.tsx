'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@tatx/ui/components/card';
import { Button } from '@tatx/ui/components/button';
import { Badge } from '@tatx/ui/components/badge';
import {
  Car,
  MapPin,
  Navigation,
  Search,
  Filter,
  RefreshCw,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { Input } from '@tatx/ui/components/input';

interface DriverLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  status: 'ONLINE' | 'BUSY' | 'OFFLINE';
  vehicleType: string;
  rating: number;
  currentRide?: string;
  lastUpdate: string;
}

interface MapVisualizationProps {
  drivers?: DriverLocation[];
  className?: string;
  height?: number;
}

const defaultDrivers: DriverLocation[] = [
  {
    id: 'DRV-001',
    name: 'Mohammed Hassan',
    latitude: 24.7136,
    longitude: 46.6753,
    status: 'ONLINE',
    vehicleType: 'Economy',
    rating: 4.8,
    lastUpdate: 'Just now',
  },
  {
    id: 'DRV-002',
    name: 'Khalid Ibrahim',
    latitude: 24.7236,
    longitude: 46.6853,
    status: 'BUSY',
    vehicleType: 'Premium',
    rating: 4.9,
    currentRide: 'RD-2024-001',
    lastUpdate: '1 min ago',
  },
  {
    id: 'DRV-003',
    name: 'Ahmed Ali',
    latitude: 24.7036,
    longitude: 46.6653,
    status: 'ONLINE',
    vehicleType: 'Comfort',
    rating: 4.7,
    lastUpdate: '2 min ago',
  },
  {
    id: 'DRV-004',
    name: 'Fahad Mohammed',
    latitude: 24.7336,
    longitude: 46.6953,
    status: 'OFFLINE',
    vehicleType: 'Luxury',
    rating: 4.6,
    lastUpdate: '30 min ago',
  },
  {
    id: 'DRV-005',
    name: 'Omar Farooq',
    latitude: 24.6936,
    longitude: 46.6553,
    status: 'BUSY',
    vehicleType: 'Economy',
    rating: 4.5,
    currentRide: 'RD-2024-002',
    lastUpdate: 'Just now',
  },
];

const statusColors: Record<string, string> = {
  ONLINE: 'bg-success-500',
  BUSY: 'bg-warning-500',
  OFFLINE: 'bg-gray-400',
};

export function MapVisualization({
  drivers = defaultDrivers,
  className,
  height = 500,
}: MapVisualizationProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [zoom, setZoom] = useState(1);
  const [selectedDriver, setSelectedDriver] = useState<DriverLocation | null>(
    null
  );

  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch = driver.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || driver.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const onlineCount = drivers.filter((d) => d.status === 'ONLINE').length;
  const busyCount = drivers.filter((d) => d.status === 'BUSY').length;
  const offlineCount = drivers.filter((d) => d.status === 'OFFLINE').length;

  // Simulated map visualization using a grid
  const mapGridSize = 10;
  const getGridPosition = (driver: DriverLocation) => {
    // Normalize coordinates to grid (simplified for demo)
    const latOffset = (driver.latitude - 24.69) * 100;
    const lngOffset = (driver.longitude - 46.65) * 100;
    return {
      x: Math.min(Math.max(lngOffset, 0), mapGridSize - 1),
      y: Math.min(Math.max(latOffset, 0), mapGridSize - 1),
    };
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Live Driver Map</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setZoom(z => Math.max(z - 0.2, 0.6))}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setZoom(z => Math.min(z + 0.2, 1.4))}>
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Stats */}
        <div className="flex gap-4 mb-4">
          <Badge className="bg-success-100 text-success-700">
            <Car className="w-3 h-3 mr-1" />
            Online: {onlineCount}
          </Badge>
          <Badge className="bg-warning-100 text-warning-700">
            <Navigation className="w-3 h-3 mr-1" />
            Busy: {busyCount}
          </Badge>
          <Badge className="bg-gray-100 text-gray-700">
            Offline: {offlineCount}
          </Badge>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search drivers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Map Visualization */}
        <div
          className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden border"
          style={{ height: `${height}px` }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, #00bcd4 1px, transparent 1px),
                linear-gradient(to bottom, #00bcd4 1px, transparent 1px)
              `,
              backgroundSize: `${40 * zoom}px ${40 * zoom}px`,
            }}
          />

          {/* Map markers */}
          <div className="absolute inset-0 p-4">
            {filteredDrivers.map((driver) => {
              const pos = getGridPosition(driver);
              return (
                <div
                  key={driver.id}
                  className="absolute cursor-pointer transition-transform hover:scale-125"
                  style={{
                    left: `${(pos.x / mapGridSize) * 100}%`,
                    top: `${(pos.y / mapGridSize) * 100}%`,
                    transform: `scale(${zoom})`,
                  }}
                  onClick={() => setSelectedDriver(driver)}
                >
                  <div className="relative">
                    <div
                      className={`w-8 h-8 rounded-full ${statusColors[driver.status]} flex items-center justify-center border-2 border-white shadow-lg`}
                    >
                      <Car className="w-4 h-4 text-white" />
                    </div>
                    {driver.status === 'BUSY' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    )}
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                      {driver.name}
                      <div className="text-warning-400">★ {driver.rating}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map controls */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="w-8 h-8"
              onClick={() => setZoom((z) => Math.min(z + 0.2, 1.4))}
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="w-8 h-8"
              onClick={() => setZoom((z) => Math.max(z - 0.2, 0.6))}
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="w-8 h-8"
              onClick={() => {
                setZoom(1);
                setSearchTerm('');
                setStatusFilter('all');
              }}
            >
              <Navigation className="w-4 h-4" />
            </Button>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg p-3 shadow-lg">
            <div className="text-xs font-medium mb-2">Driver Status</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success-500" />
                <span className="text-xs">Online</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-warning-500" />
                <span className="text-xs">Busy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-400" />
                <span className="text-xs">Offline</span>
              </div>
            </div>
          </div>
        </div>

        {/* Driver List */}
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Drivers ({filteredDrivers.length})</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
            {filteredDrivers.map((driver) => (
              <div
                key={driver.id}
                className={`p-2 rounded-lg border cursor-pointer transition-colors ${
                  selectedDriver?.id === driver.id
                    ? 'bg-brand-50 border-brand-200'
                    : 'bg-white hover:bg-gray-50'
                }`}
                onClick={() => setSelectedDriver(driver)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${statusColors[driver.status]}`}
                    />
                    <span className="text-sm font-medium">{driver.name}</span>
                  </div>
                  <span className="text-xs text-warning-600">★ {driver.rating}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {driver.vehicleType} • {driver.lastUpdate}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Driver Details */}
        {selectedDriver && (
          <div className="mt-4 p-4 bg-brand-50 rounded-lg border border-brand-200">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium">{selectedDriver.name}</h4>
                <p className="text-sm text-gray-600">
                  {selectedDriver.vehicleType} • ID: {selectedDriver.id}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {selectedDriver.latitude.toFixed(4)},{' '}
                    {selectedDriver.longitude.toFixed(4)}
                  </span>
                </div>
              </div>
              <Badge className={statusColors[selectedDriver.status]}>
                {selectedDriver.status}
              </Badge>
            </div>
            {selectedDriver.currentRide && (
              <div className="mt-2 text-sm text-gray-600">
                Current Ride: <span className="font-medium">{selectedDriver.currentRide}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
