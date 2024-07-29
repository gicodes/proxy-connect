import type { NextApiRequest, NextApiResponse } from "next";
import { businessRepo } from "@/lib/api/mongodb/repo";

// auth handler for db sign-up-with email or username
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