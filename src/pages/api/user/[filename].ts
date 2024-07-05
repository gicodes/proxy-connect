// app/api/uploads/[filename]/route.ts for next 13.4+
import { NextApiRequest, NextApiResponse } from "next";
import { connectDBucket } from "@/lib/api/mongodb/connectBucket";
import { NextResponse } from "next/server";

type Params = {
  params: { filename: string };
};

export async function handler(
  res: NextApiResponse, req: NextApiRequest
  ) {
  if (req && req.method === "POST"){
    try {
      const { bucket } = await connectDBucket();
      const { filename } = req.query;
      if (!filename) {
        return new NextResponse(null, { status: 400, statusText: "Uncompleted Request" });
      }

      const downloadStream = bucket.openDownloadStreamByName(filename as string);

      downloadStream.on('error', (error) => {
        console.error('Error downloading picture:', error);
        res.status(500).json({ error: 'Error downloading picture' });
        client.close();
      });

      downloadStream.pipe(res); 
    } 
    catch (err: any) {
      console.error('Error:', err);
      res.status(500).json({ error: 'An error occurred' });
    }
  } else { 
    console.error("Request failed! Failed to download!");
  }
} 