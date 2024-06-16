// app/api/upload/route.ts for Next 13.4+
import { connectDBucket, fileExists } from "@/lib/api/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default async function handler(
  req: NextApiRequest, res: NextApiResponse
  ) {
  try {
    const { bucket } = await connectDBucket();
    const {filename} = await req.body;

    if (!filename) {
      return res.status(400).json({ error: 'Missing filename header' });
    }

    const existing = await fileExists(filename);
    if (existing) {
      // if file already exists, you might want to handle this case differently.
      return;
    }

    const uploadStream = bucket.openUploadStream(filename);
    req.pipe(uploadStream);

    uploadStream.on('error', (error) => {
      console.error('Error uploading picture:', error);
      res.status(500).json({ error: 'Error uploading picture' });
      client.close();
    });

    uploadStream.on('finish', () => {
      console.log('Picture uploaded successfully');
      res.status(200).json({ message: 'Picture uploaded successfully' });
      client.close();
    });

    console.log('Successfully uploaded')
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
