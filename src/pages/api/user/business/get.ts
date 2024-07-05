import type { NextApiRequest, NextApiResponse } from "next";
import { businessRepo } from "../../repo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const rider = await businessRepo.getById(req.query.id as string);
  if (!rider) throw new Error("User Not Found");

  return res.status(200).json(rider);
}