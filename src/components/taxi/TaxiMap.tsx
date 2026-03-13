
'use client';

import { MapContainer, TileLayer, Marker, Popup, Polyline, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

// Fix for default marker icons in Leaflet with Next.js
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface TaxiMapProps {
  pickup: string;
  destination: string;
}

export default function TaxiMap({ pickup, destination }: TaxiMapProps) {
  // Hardcoded coordinates for demo purposes (Riyadh Area)
  const riyadhCenter: [number, number] = [24.7136, 46.6753];
  const pickupCoords: [number, number] = [24.8115, 46.6236]; // Al Malqa
  const destCoords: [number, number] = [24.7600, 46.6300]; // KAFD Area

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={riyadhCenter} 
        zoom={12} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Pickup Marker */}
        {pickup && (
          <Marker position={pickupCoords}>
            <Popup>نقطة الانطلاق: {pickup}</Popup>
          </Marker>
        )}

        {/* Destination Marker and Route Line */}
        {destination && (
          <>
            <Marker position={destCoords}>
              <Popup>الوجهة: {destination}</Popup>
            </Marker>
            {/* Simple Visual Routing Line */}
            <Polyline 
              positions={[pickupCoords, destCoords]} 
              color="#EF4444" 
              weight={5} 
              opacity={0.6}
              dashArray="10, 10"
            />
          </>
        )}
        
        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  );
}
