import type { NextApiRequest, NextApiResponse } from "next";
import { ridersRepo } from "./repo";

export default async function handler(
  req: NextApiRequest, res: NextApiResponse
  ) {
    console.log(`req.query.id: ${req.query.id}`);
  try {
    await ridersRepo.update(req.query.id as string, req.body);
    return res.status(200)
  } catch(err: any) {
    console.log(`Server CL: error updating user - ${err.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
}