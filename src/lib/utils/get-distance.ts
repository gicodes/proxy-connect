/**
 * Calculates the distance between two coordinates using the Haversine formula.
 * @param coord1 - The first set of coordinates [longitude, latitude].
 * @param coord2 - The second set of coordinates [longitude, latitude].
 * @returns The distance in kilometers.
 */

export function calculateDistance(coord1: [number, number], coord2: [number, number]): number {
  const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

  const [lon1, lat1] = coord1;
  const [lon2, lat2] = coord2;

  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in kilometers
}