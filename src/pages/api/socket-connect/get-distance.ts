import { getDistanceBetweenLocations } from '@/components/routes/connect/proxy';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { origin, destination } = req.query;

  try {
    const originLocation = JSON.parse(origin as string);
    const destinationLocation = JSON.parse(destination as string);

    const distanceData = await getDistanceBetweenLocations(originLocation, destinationLocation);
    res.status(200).json(distanceData);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
