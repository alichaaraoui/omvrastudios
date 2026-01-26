import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Project } from "@/lib/projects";

const DATA_FILE = path.join(process.cwd(), "data", "projects.json");

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data");
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// GET - Fetch all projects
export async function GET() {
  try {
    await ensureDataDir();
    try {
      const fileContents = await fs.readFile(DATA_FILE, "utf8");
      const projects = JSON.parse(fileContents);
      return NextResponse.json(projects);
    } catch (error: any) {
      // File doesn't exist, return empty array
      if (error.code === "ENOENT") {
        return NextResponse.json([]);
      }
      throw error;
    }
  } catch (error) {
    console.error("Error reading projects:", error);
    return NextResponse.json({ error: "Failed to read projects" }, { status: 500 });
  }
}

// POST - Create a new project
export async function POST(request: NextRequest) {
  try {
    await ensureDataDir();
    const project: Project = await request.json();

    // Read existing projects
    let projects: Project[] = [];
    try {
      const fileContents = await fs.readFile(DATA_FILE, "utf8");
      projects = JSON.parse(fileContents);
    } catch (error: any) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }

    // Add new project
    projects.push(project);

    // Write back to file
    await fs.writeFile(DATA_FILE, JSON.stringify(projects, null, 2));

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

