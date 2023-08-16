import type { NextApiRequest, NextApiResponse } from "next";
import { ridersRepo } from "@/pages/api/riders/repo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
  try {
    await ridersRepo.create(req.body);
    return res.status(200)
    .redirect('/');
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
} 