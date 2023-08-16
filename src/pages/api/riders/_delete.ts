import type { NextApiRequest, NextApiResponse } from "next";
import { ridersRepo } from "./repo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await ridersRepo.delete(req.query.id as string);
  return res.status(200).json({});
}