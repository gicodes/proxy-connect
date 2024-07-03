import { NextApiRequest, NextApiResponse } from 'next';
import { businessRepo } from './repo';

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse
    ) {
    try {
      const riders = await businessRepo.getAll();
      return res.status(200).json(riders);
    } catch (err: any) {
      res.status(500).redirect('/404')
    }
}