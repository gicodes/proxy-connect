import type { NextApiRequest, NextApiResponse } from "next";
import { ridersRepo } from "./repo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const rider = await ridersRepo.getById(req.query.id as string);

  if (!rider) throw "rider Not Foun";

  console.log("Server CL: Got User")

  return res.status(200).json(rider);
}