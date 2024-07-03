import type { NextApiRequest, NextApiResponse } from "next";
import { businessRepo } from "@/pages/api/repo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
  try {
    await businessRepo.create(req.body);
    return res.status(200)
    .redirect('/auth/sign-in');
  } catch (err: any) {
    console.error(err);
    res.status(500).redirect('/error');
  }
} 