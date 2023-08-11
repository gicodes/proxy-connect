import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
  ) {
    const session = await getServerSession();
    // do something with session
  }