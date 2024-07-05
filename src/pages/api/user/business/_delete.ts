import type { NextApiRequest, NextApiResponse } from "next";
import { businessRepo } from "../../repo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await businessRepo.delete(req.query.id as string);
  return res.status(200).json({});
}