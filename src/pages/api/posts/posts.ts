import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export async function POST (
  req: NextApiRequest, 
  res: NextApiResponse) 
  {
  const client = await clientPromise;
  const db = client.db("posts");
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      let myPost = await db.collection("posts").insertOne(bodyObject);
      res.json(myPost.ops[0]);
      break;
    case "GET":
      const allPosts = await db.collection("allPosts").find({}).toArray();
      res.json({ status: 200, data: allPosts });
      break;
  }
}