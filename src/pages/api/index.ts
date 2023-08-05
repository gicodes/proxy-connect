import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { ridersRepo } from './riders/repo';

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
  ) {
    if (req.method === "GET") {
      const session = await getSession();
      const rider = ridersRepo.getById(session?.user?.email);
      res.status(200).json(rider);
    }

    if (req.method === "PUT") {
      console.log('fetching location..')
      const session = await getSession();
      const { latitude, longitude } = req.body;
      // for some reason i've not fixed the update action via insertOne
      await ridersRepo.update(session?.user?.email, longitude, latitude);
    };

    res.status(200).redirect('/');
  }