// app/api/upload/route.ts for Next 13.4+
import { connectDBucket, fileExists } from "@/lib/api/mongodb";
import { NextResponse } from "next/server";
import { NextApiResponse } from "next";
import { Readable } from "stream";

export default async function handler(
  req: Request, res: NextApiResponse
  ) {
  try {
    const { bucket } = await connectDBucket();
    const data = await req.formData();

    for (const entry of Array.from(data.entries())) {
      const [key, value] = entry;
      // formDataEntryValue can either be type `Blob` or `string`. If its type is object then it's a Blob
      const isFile = typeof value == "object";

      if (isFile) {
        const blob = value as Blob;
        const filename = blob.name;

        const existing = await fileExists(filename);
        if (existing) {
          // if file already exists, you might want to handle this case differently.
          continue;
        }

        // convert the blob to a stream
        const buffer = Buffer.from(await blob.arrayBuffer());
        const stream = Readable.from(buffer);

        const uploadStream = bucket.openUploadStream(filename, {
          // make sure to add content type so that it will be easier to set later.
          contentType: blob.type,
          metadata: {}, //add your metadata here if any
        });
        // pipe the readable stream to a writeable stream to save it to the database
        await stream.pipe(uploadStream);
      }
    }

    // console.log('Successfully uploaded')
    return NextResponse.json({ success: true });
  } catch (error) {
    // console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
