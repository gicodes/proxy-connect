import type { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from './auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
  ) {
    const session = await getServerSession(req, res, authOptions);
    // do something with session
  }