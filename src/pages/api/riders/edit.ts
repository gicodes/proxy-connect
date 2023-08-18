import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { ridersRepo } from "./repo";

// async function getUserSession() {
//   const session = await getSession()
//   return session?.user.name;
// }
// const userSession = getUserSession();

export default async function handler(
  req: NextApiRequest, res: NextApiResponse
  ) {
    console.log(`req.query.id: ${req.query.id}`);
  try {
    await ridersRepo.update(req.query.id as string, req.body);
    return res.status(200)
  } catch(err: any) {
    console.log(`Server CL: error updating user - ${err.message}`);
    res.status(500).redirect('/');
  }
}