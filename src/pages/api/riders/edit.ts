import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { ridersRepo } from "./repo";

export default async function handler(
  req: NextApiRequest, res: NextApiResponse
  ) {
    const session = await getServerSession(req, res, authOptions)
    if (req && req.method === "POST"){
      try {
        await ridersRepo.update({ email: session?.user.email, params: req.body});
        return res.status(200).redirect('/profile');
      } catch(err: any) {
        console.log(`Server CL: error updating user because ${err.message}`);
        res.status(500).redirect('/error');
        }
  }
}
