import type { NextApiRequest, NextApiResponse } from "next";
import { businessRepo } from "../../../lib/api/mongodb/repo";

// auth handler for db sign-in-with email or username
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
  try {
    await businessRepo.retrieve(req.body);
    return res.status(200)
    .redirect('/');
  } catch (err: any) {
    res.status(500).json({ message: 'Internal server error' });
  }
}