import { NextResponse } from "next/server";
import { saveUploadedFile } from "@/lib/projectStorageServer";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    if (!files?.length) {
      const single = formData.get("file") as File | null;
      const list = single ? [single] : [];
      if (!list.length) {
        return NextResponse.json(
          { error: "No files provided" },
          { status: 400 }
        );
      }
      const urls: string[] = [];
      for (const file of list) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const url = saveUploadedFile(buffer, file.name);
        urls.push(url);
      }
      return NextResponse.json({ urls });
    }
    const urls: string[] = [];
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const url = saveUploadedFile(buffer, file.name);
      urls.push(url);
    }
    return NextResponse.json({ urls });
  } catch (error) {
    console.error("POST /api/upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload files" },
      { status: 500 }
    );
  }
}
