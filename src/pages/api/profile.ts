import { businessRepo } from './repo';
import { getServerSession } from "next-auth/next";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession();     
  try {
    const rider = await businessRepo.getById(session?.user.id);
    return res.status(200).json(rider);
  } 
  catch {
    return res.status(500).json({ error: 'Request failed!' });
  }
}