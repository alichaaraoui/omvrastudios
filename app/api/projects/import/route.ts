import { NextResponse } from "next/server";
import {
  readProjects,
  writeProjects,
  saveDataUrl,
} from "@/lib/projectStorageServer";
import { Project, ProjectImage } from "@/lib/projects";

export async function POST(request: Request) {
  try {
    const projects = (await request.json()) as Project[];
    if (!Array.isArray(projects)) {
      return NextResponse.json(
        { error: "Body must be an array of projects" },
        { status: 400 }
      );
    }

    const result: Project[] = [];
    for (const p of projects) {
      const images: ProjectImage[] = [];
      for (const img of p.images || []) {
        let url = img.url;
        let thumbnailUrl = img.thumbnailUrl || img.url;
        if (url.startsWith("data:")) {
          url = saveDataUrl(url);
          thumbnailUrl = url;
        }
        if (thumbnailUrl.startsWith("data:")) {
          thumbnailUrl = saveDataUrl(thumbnailUrl);
        }
        images.push({ ...img, url, thumbnailUrl });
      }
      result.push({
        ...p,
        images,
        updatedAt: new Date().toISOString(),
      });
    }

    writeProjects(result);
    return NextResponse.json({ ok: true, count: result.length });
  } catch (error) {
    console.error("POST /api/projects/import error:", error);
    return NextResponse.json(
      { error: "Failed to import projects" },
      { status: 500 }
    );
  }
}
