import { NextResponse } from "next/server";
import { readProjects, writeProjects } from "@/lib/projectStorageServer";
import { Project } from "@/lib/projects";

export async function GET() {
  try {
    const projects = readProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json(
      { error: "Failed to load projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const projects = readProjects();

    // Single project create
    const project = body as Project;
    if (!project.id || !project.title || !project.description) {
      return NextResponse.json(
        { error: "Missing id, title, or description" },
        { status: 400 }
      );
    }
    if (projects.some((p) => p.id === project.id)) {
      return NextResponse.json(
        { error: "Project with this id already exists" },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const newProject: Project = {
      ...project,
      createdAt: project.createdAt || now,
      updatedAt: now,
    };
    projects.push(newProject);
    writeProjects(projects);
    return NextResponse.json(newProject);
  } catch (error) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
