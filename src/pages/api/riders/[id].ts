import { ridersRepo } from './repo';
import { getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse
    ) {
      if (req.method === "GET") {
        const session = await getServerSession();
        const rider = ridersRepo.getById(session?.user?.email);
        res.status(200).json(rider);
      }
  
      if (req.method === "PUT") {
        const session = await getServerSession();
        const { latitude, longitude } = req.body;
        await ridersRepo.update(session?.user.name, {longitude, latitude});
      };
  
    }