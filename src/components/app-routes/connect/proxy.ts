import axios from 'axios';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

interface Location {
  lat: number;
  lng: number;
}

interface DistanceResponse {
  distance: string;
  duration: string;
}

export const getDistanceBetweenLocations = async (
    origin: Location, destination: Location
): Promise<DistanceResponse> => {
  const originString = `${origin.lat},${origin.lng}`;
  const destinationString = `${destination.lat},${destination.lng}`;

  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${originString}&destinations=${destinationString}&key=${GOOGLE_MAPS_API_KEY}`
  );

  const data = response.data;
  if (data.rows[0].elements[0].status === 'OK') {
    const distance = data.rows[0].elements[0].distance.text;
    const duration = data.rows[0].elements[0].duration.text;
    return { distance, duration };
  } else {
    throw new Error('Unable to calculate distance');
  }
};
