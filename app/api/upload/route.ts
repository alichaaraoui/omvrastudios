import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { existsSync, mkdirSync } from "fs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("images");

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    
    // Ensure upload directory exists
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    const urls: string[] = [];

    for (const file of files) {
      if (!(file instanceof File)) {
        console.error("Invalid file object:", file);
        continue;
      }

      // Check file size (limit to 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        console.error(`File ${file.name} is too large: ${file.size} bytes`);
        continue;
      }

      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate unique filename
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(2, 15);
        const extension = file.name.split(".").pop() || "jpg";
        const filename = `${timestamp}-${randomStr}.${extension}`;
        const filepath = path.join(uploadDir, filename);

        // Write file to disk
        await writeFile(filepath, buffer);

        // Return URL path (relative to public folder)
        urls.push(`/uploads/${filename}`);
      } catch (fileError) {
        console.error(`Error processing file ${file.name}:`, fileError);
        // Continue with other files even if one fails
      }
    }

    if (urls.length === 0) {
      return NextResponse.json({ error: "No files were successfully uploaded" }, { status: 400 });
    }

    return NextResponse.json({ urls });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ 
      error: "Failed to upload files", 
      details: error?.message || "Unknown error" 
    }, { status: 500 });
  }
}

