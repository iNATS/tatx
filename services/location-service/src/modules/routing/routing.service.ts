import { Injectable } from '@nestjs/common';

@Injectable()
export class RoutingService {
  async getRoute(
    originLat: number,
    originLng: number,
    destLat: number,
    destLng: number,
  ) {
    // TODO: Integrate with Google Maps Directions API
    const distance = this.calculateDistance(originLat, originLng, destLat, destLng);
    const duration = distance / 40 * 60; // Assume 40 km/h average speed

    return {
      distance: distance,
      distanceText: `${distance.toFixed(1)} km`,
      duration: Math.round(duration),
      durationText: `${Math.round(duration)} mins`,
      polyline: 'mock_polyline_string',
      steps: [
        { instruction: 'Head north', distance: distance / 2, duration: duration / 2 },
        { instruction: 'Turn right', distance: distance / 2, duration: duration / 2 },
      ],
    };
  }

  async getDistanceMatrix(
    origins: { latitude: number; longitude: number }[],
    destinations: { latitude: number; longitude: number }[],
  ) {
    // TODO: Integrate with Google Maps Distance Matrix API
    return origins.map((origin) => ({
      origin,
      distances: destinations.map((dest) => ({
        destination: dest,
        distance: this.calculateDistance(origin.latitude, origin.longitude, dest.latitude, dest.longitude),
        duration: this.calculateDistance(origin.latitude, origin.longitude, dest.latitude, dest.longitude) / 40 * 60,
      })),
    }));
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
