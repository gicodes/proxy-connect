import { NextApiRequest, NextApiResponse } from 'next';
import { businessRepo } from '../../lib/api/mongodb/repo';

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse
    ) {
    try {
      const users = await businessRepo.getAll();
      return res.status(200).json(users);
    } catch (err: any) {
      res.status(500).redirect('/404')
    }
}