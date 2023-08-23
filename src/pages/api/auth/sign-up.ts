import type { NextApiRequest, NextApiResponse } from "next";
import { ridersRepo } from "@/pages/api/repo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
  try {
    await ridersRepo.create(req.body);
    return res.status(200)
    .redirect('/auth/sign-in');
  } catch (err: any) {
    res.status(500).json({ message: 'Internal server error' });
  }
} 