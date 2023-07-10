import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function signUp(
  req: NextApiRequest,
  res: NextApiResponse
  ): Promise<any> {
    try {
      const client = await clientPromise;
      const db = await client.db("tsaron-gps");
      console.log("connected to database")

      if (req.method === "POST"){
        console.log(req.body);
        let credentials = JSON.parse(req.body); 
        await db.collection("users").insertOne(credentials);
        alert("Signed up successfully")
        console.log("Signed up", credentials);

        res.status(200).json({ message: 'Sign up successful' });
      }
    } catch (err: any) {
      console.error(err.message);
      res.status(500).json({ message: 'Internal server error' });
    }
}