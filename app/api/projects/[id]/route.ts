import { NextResponse } from "next/server";
import { readProjects, writeProjects } from "@/lib/projectStorageServer";
import { Project } from "@/lib/projects";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const projects = readProjects();
    const project = projects.find((p) => p.id === id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    console.error("GET /api/projects/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to load project" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const project = (await request.json()) as Project;
    const projects = readProjects();
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    const updated: Project = {
      ...project,
      id,
      updatedAt: new Date().toISOString(),
    };
    projects[index] = updated;
    writeProjects(projects);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/projects/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const all = readProjects();
    const projects = all.filter((p) => p.id !== id);
    if (projects.length === all.length) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    writeProjects(projects);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/projects/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
