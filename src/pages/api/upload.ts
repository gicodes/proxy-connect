// /api/upload/route.ts for Next 13.4+
import { connectDbxBucket, fileExists } from "@/lib/api/mongodb";
import { NextResponse } from "next/server";
import { Readable } from "stream";

export async function POST(req: Request) {
  const { bucket } = await connectDbxBucket();
  // get the form data
  const data = await req.formData();

    const value = data;
    // FormDataEntryValue can either be type `Blob` or `string`
    // if its type is object then it's a Blob
    const isFile = typeof value == "object";

    if (isFile) {
      const blob = value as unknown as Blob;
      const filename = blob.name;

      const existing = await fileExists(filename);
      if (existing) {
        // If file already exists, let's return early.
        // If you want a different behavior such as override, modify this part.
        return;
      }

      //conver the blob to stream
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

  // return the response after all the entries have been processed.
  return NextResponse.json({ success: true });
}
