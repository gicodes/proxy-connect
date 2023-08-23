import { NextApiRequest, NextApiResponse } from 'next';
import { ridersRepo } from './repo';

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse
    ) {
    try {
      const riders = await ridersRepo.getAll();
      return res.status(200).json(riders);
    } catch (err: any) {
      res.status(500).redirect('/404')
    }
}