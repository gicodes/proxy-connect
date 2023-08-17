import type { NextApiRequest, NextApiResponse } from "next";
import { ridersRepo } from "../riders/repo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
  try {
    await ridersRepo.retrieve(req.body);
    return res.status(200)
    .redirect('/');
  } catch (err: any) {
    res.status(500).json({ message: 'Internal server error' });
  }
}