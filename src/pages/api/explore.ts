import { NextApiRequest, NextApiResponse } from 'next';
import { ridersRepo } from './riders/repo';

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse
    ) {
    try {
      const riders = await ridersRepo.getAll();
      return res.status(200).json(riders);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).json({message: 'Cannot connect. Contact customer care' })
    }
}