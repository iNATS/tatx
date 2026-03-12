/**
 * Geographic utility functions
 */

import { calculateDistance, calculateBearing, toRadians, toDegrees } from './math';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Location extends Coordinates {
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

/**
 * Calculate distance between two coordinates in kilometers
 */
export function getDistance(coord1: Coordinates, coord2: Coordinates): number {
  return calculateDistance(
    coord1.latitude,
    coord1.longitude,
    coord2.latitude,
    coord2.longitude
  );
}

/**
 * Calculate distance in meters
 */
export function getDistanceInMeters(coord1: Coordinates, coord2: Coordinates): number {
  return getDistance(coord1, coord2) * 1000;
}

/**
 * Calculate bearing between two coordinates
 */
export function getBearing(coord1: Coordinates, coord2: Coordinates): number {
  return calculateBearing(
    coord1.latitude,
    coord1.longitude,
    coord2.latitude,
    coord2.longitude
  );
}

/**
 * Check if coordinates are valid
 */
export function isValidCoordinates(latitude: number, longitude: number): boolean {
  return latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;
}

/**
 * Check if location is within radius of a point
 */
export function isWithinRadius(
  location: Coordinates,
  center: Coordinates,
  radiusKm: number
): boolean {
  return getDistance(location, center) <= radiusKm;
}

/**
 * Find nearest location from a list
 */
export function findNearest(
  target: Coordinates,
  locations: (Coordinates & { id: string })[]
): (Coordinates & { id: string; distance: number }) | null {
  if (locations.length === 0) return null;

  let nearest = locations[0];
  let minDistance = getDistance(target, nearest);

  for (const location of locations) {
    const distance = getDistance(target, location);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = location;
    }
  }

  return { ...nearest, distance: minDistance };
}

/**
 * Sort locations by distance from a point
 */
export function sortByDistance(
  target: Coordinates,
  locations: (Coordinates & { id: string })[]
): (Coordinates & { id: string; distance: number })[] {
  return locations
    .map((location) => ({
      ...location,
      distance: getDistance(target, location),
    }))
    .sort((a, b) => a.distance - b.distance);
}

/**
 * Filter locations within radius
 */
export function filterByRadius(
  center: Coordinates,
  locations: (Coordinates & { id: string })[],
  radiusKm: number
): (Coordinates & { id: string; distance: number })[] {
  return locations
    .map((location) => ({
      ...location,
      distance: getDistance(center, location),
    }))
    .filter((location) => location.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance);
}

/**
 * Calculate midpoint between two coordinates
 */
export function getMidpoint(coord1: Coordinates, coord2: Coordinates): Coordinates {
  const lat1 = toRadians(coord1.latitude);
  const lon1 = toRadians(coord1.longitude);
  const lat2 = toRadians(coord2.latitude);
  const lon2 = toRadians(coord2.longitude);

  const dLon = lon2 - lon1;

  const Bx = Math.cos(lat2) * Math.cos(dLon);
  const By = Math.cos(lat2) * Math.sin(dLon);

  const lat3 = Math.atan2(
    Math.sin(lat1) + Math.sin(lat2),
    Math.sqrt((Math.cos(lat1) + Bx) * (Math.cos(lat1) + Bx) + By * By)
  );
  const lon3 = lon1 + Math.atan2(By, Math.cos(lat1) + Bx);

  return {
    latitude: toDegrees(lat3),
    longitude: toDegrees(lon3),
  };
}

/**
 * Calculate destination point given distance and bearing
 */
export function getDestination(
  start: Coordinates,
  distanceKm: number,
  bearingDegrees: number
): Coordinates {
  const R = 6371; // Earth's radius in km
  const lat1 = toRadians(start.latitude);
  const lon1 = toRadians(start.longitude);
  const bearing = toRadians(bearingDegrees);

  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(distanceKm / R) +
      Math.cos(lat1) * Math.sin(distanceKm / R) * Math.cos(bearing)
  );
  const lon2 =
    lon1 +
    Math.atan2(
      Math.sin(bearing) * Math.sin(distanceKm / R) * Math.cos(lat1),
      Math.cos(distanceKm / R) - Math.sin(lat1) * Math.sin(lat2)
    );

  return {
    latitude: toDegrees(lat2),
    longitude: toDegrees(lon2),
  };
}

/**
 * Calculate area of a polygon (in square kilometers)
 */
export function calculatePolygonArea(coordinates: Coordinates[]): number {
  if (coordinates.length < 3) return 0;

  const R = 6371; // Earth's radius in km
  let area = 0;

  for (let i = 0; i < coordinates.length; i++) {
    const j = (i + 1) % coordinates.length;
    const lat1 = toRadians(coordinates[i].latitude);
    const lon1 = toRadians(coordinates[i].longitude);
    const lat2 = toRadians(coordinates[j].latitude);
    const lon2 = toRadians(coordinates[j].longitude);

    area += (lon2 - lon1) * (2 + Math.sin(lat1) + Math.sin(lat2));
  }

  return Math.abs((area * R * R) / 2);
}

/**
 * Check if a point is inside a polygon
 */
export function isPointInPolygon(point: Coordinates, polygon: Coordinates[]): boolean {
  let inside = false;
  const x = point.longitude;
  const y = point.latitude;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].longitude;
    const yi = polygon[i].latitude;
    const xj = polygon[j].longitude;
    const yj = polygon[j].latitude;

    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
}

/**
 * Create a bounding box around a point
 */
export function createBoundingBox(
  center: Coordinates,
  radiusKm: number
): { north: number; south: number; east: number; west: number } {
  const R = 6371; // Earth's radius in km
  const latDelta = (radiusKm / R) * (180 / Math.PI);
  const lonDelta = (radiusKm / R) * (180 / Math.PI) / Math.cos(toRadians(center.latitude));

  return {
    north: center.latitude + latDelta,
    south: center.latitude - latDelta,
    east: center.longitude + lonDelta,
    west: center.longitude - lonDelta,
  };
}

/**
 * Check if a point is within a bounding box
 */
export function isPointInBoundingBox(
  point: Coordinates,
  bbox: { north: number; south: number; east: number; west: number }
): boolean {
  return (
    point.latitude >= bbox.south &&
    point.latitude <= bbox.north &&
    point.longitude >= bbox.west &&
    point.longitude <= bbox.east
  );
}

/**
 * Encode coordinates to polyline string (Google Maps format)
 */
export function encodePolyline(coordinates: Coordinates[]): string {
  const encodeNumber = (num: number): string => {
    num = Math.round(num * 1e5);
    num = num < 0 ? ~num << 1 | 1 : num << 1;
    let encoded = '';
    while (num >= 0x20) {
      encoded += String.fromCharCode((0x20 | (num & 0x1f)) + 63);
      num >>= 5;
    }
    encoded += String.fromCharCode(num + 63);
    return encoded;
  };

  let polyline = '';
  let prevLat = 0;
  let prevLon = 0;

  for (const coord of coordinates) {
    const lat = Math.round(coord.latitude * 1e5);
    const lon = Math.round(coord.longitude * 1e5);
    polyline += encodeNumber(lat - prevLat);
    polyline += encodeNumber(lon - prevLon);
    prevLat = lat;
    prevLon = lon;
  }

  return polyline;
}

/**
 * Decode polyline string to coordinates
 */
export function decodePolyline(polyline: string): Coordinates[] {
  const decodeNumber = (index: { value: number }): number => {
    let shift = 0;
    let result = 0;
    let byte;
    do {
      byte = polyline.charCodeAt(index.value++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    return result & 1 ? ~(result >> 1) : result >> 1;
  };

  const coordinates: Coordinates[] = [];
  let index = { value: 0 };
  let lat = 0;
  let lon = 0;

  while (index.value < polyline.length) {
    lat += decodeNumber(index);
    lon += decodeNumber(index);
    coordinates.push({
      latitude: lat / 1e5,
      longitude: lon / 1e5,
    });
  }

  return coordinates;
}

/**
 * Calculate estimated travel time based on distance
 */
export function estimateTravelTime(distanceKm: number, speedKmh: number = 40): number {
  // Returns time in minutes
  return (distanceKm / speedKmh) * 60;
}

/**
 * Get coordinates from geohash
 */
export function geohashToCoordinates(geohash: string): Coordinates {
  // Simplified geohash decoding (for demonstration)
  // In production, use a proper geohash library
  const base32 = '0123456789bcdefghjkmnpqrstuvwxyz';
  let lat = [-90, 90];
  let lon = [-180, 180];
  let isLon = true;

  for (const char of geohash.toLowerCase()) {
    const val = base32.indexOf(char);
    for (let i = 4; i >= 0; i--) {
      const bit = (val >> i) & 1;
      if (isLon) {
        const mid = (lon[0] + lon[1]) / 2;
        if (bit) {
          lon[0] = mid;
        } else {
          lon[1] = mid;
        }
      } else {
        const mid = (lat[0] + lat[1]) / 2;
        if (bit) {
          lat[0] = mid;
        } else {
          lat[1] = mid;
        }
      }
      isLon = !isLon;
    }
  }

  return {
    latitude: (lat[0] + lat[1]) / 2,
    longitude: (lon[0] + lon[1]) / 2,
  };
}
