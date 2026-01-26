import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Project } from "@/lib/projects";

const DATA_FILE = path.join(process.cwd(), "data", "projects.json");

// PUT - Update a project
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project: Project = await request.json();

    // Read existing projects
    const fileContents = await fs.readFile(DATA_FILE, "utf8");
    const projects: Project[] = JSON.parse(fileContents);

    // Find and update project
    const index = projects.findIndex((p) => p.id === params.id);
    if (index === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    projects[index] = project;

    // Write back to file
    await fs.writeFile(DATA_FILE, JSON.stringify(projects, null, 2));

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

// DELETE - Delete a project
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Read existing projects
    const fileContents = await fs.readFile(DATA_FILE, "utf8");
    const projects: Project[] = JSON.parse(fileContents);

    // Filter out the project to delete
    const filteredProjects = projects.filter((p) => p.id !== params.id);

    if (filteredProjects.length === projects.length) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Write back to file
    await fs.writeFile(DATA_FILE, JSON.stringify(filteredProjects, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}

