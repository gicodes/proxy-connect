import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { ridersRepo } from "../repo";

export default async function handler(
  req: NextApiRequest, res: NextApiResponse
  ) {
    const session = await getServerSession(req, res, authOptions)
    if (req.body.length < 4) {console.log("Invalid data"); return;}
    if (req && req.method === "POST"){
      try {
        // extracting userData from body
        const userData: any = {};
        const boundary = req.body.match(/--(.*?)\r\n/)[1];
        const parts = req.body.split(`--${boundary}`).slice(1, -1);

        // split forEach and trim userData
        parts.forEach(
          (part: { split: (arg0: string) => [any, any]; }) => {
            const [header, value] = part.split('\r\n\r\n');
            const nameMatch = header.match(/name="(.+?)"/);

            if (nameMatch) {
              const fieldName = nameMatch[1];
              if (fieldName === 'image') {
                delete userData.image;
              } else {
                userData[fieldName] = value.trim();
              }
            }
        });

        // if !password, modify form values
        if (userData.password === ''){
          userData.password = undefined;
        }
        if (userData.newPassword.length === 0) {
          userData.newPassword = undefined;
        }

        await ridersRepo.update(session?.user.email, userData);
        return res.status(200).redirect('/profile');
      } 
      catch(err: any) {
        // console.log(`Server CL: error updating user because ${err.message}`);
        res.status(500).redirect('/501');
      }
  }
}
