// app/api/uploads/[filename]/route.ts for next 13.4+
import { connectDBucket } from "@/lib/api/mongodb";
import { NextResponse } from "next/server";

type Params = {
  params: { filename: string };
};

export async function handler(req: Request, { params }: Params) {
  const { bucket } = await connectDBucket();

  const filename = params.filename as string;
  if (!filename) {
    return new NextResponse(null, { status: 400, statusText: "Bad Request" });
  }

  const files = await bucket.find({ filename }).toArray();

  if (!files.length) {
    return new NextResponse(null, { status: 404, statusText: "Not found" });
  }
  const file = files.at(0)!; 

  // Force the type to be ReadableStream since NextResponse doesn't accept GridFSBucketReadStream
  const stream = bucket.openDownloadStreamByName(filename) as unknown as ReadableStream;

  return new NextResponse(stream, {
    headers: {
      "Content-Type": file.contentType!,
    },
  });
}
