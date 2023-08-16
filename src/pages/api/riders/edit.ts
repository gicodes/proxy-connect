import type { NextApiRequest, NextApiResponse } from "next";
import { ridersRepo } from "./repo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  await ridersRepo.update(req.query.id as string, req.body);

  console.log("Server CL: Updated User Information")

  return res.status(200).redirect('#');
}