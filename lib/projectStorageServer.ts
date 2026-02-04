import fs from "fs";
import path from "path";
import { Project } from "./projects";

const DATA_DIR = path.join(process.cwd(), "data");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");
const PUBLIC_PROJECTS_FILE = path.join(process.cwd(), "public", "projects.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

export function getProjectsFilePath(): string {
  return PROJECTS_FILE;
}

export function getUploadsDir(): string {
  return UPLOADS_DIR;
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function readProjects(): Project[] {
  ensureDir(DATA_DIR);
  if (!fs.existsSync(PROJECTS_FILE)) {
    return [];
  }
  const raw = fs.readFileSync(PROJECTS_FILE, "utf-8");
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function writeProjects(projects: Project[]): void {
  ensureDir(DATA_DIR);
  const json = JSON.stringify(projects, null, 2);
  fs.writeFileSync(PROJECTS_FILE, json, "utf-8");
  // Also write to public so static deploy (e.g. GitHub Pages) can serve it after commit
  ensureDir(path.dirname(PUBLIC_PROJECTS_FILE));
  fs.writeFileSync(PUBLIC_PROJECTS_FILE, json, "utf-8");
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function saveUploadedFile(buffer: Buffer, originalName: string): string {
  ensureDir(UPLOADS_DIR);
  const ext = path.extname(originalName) || ".jpg";
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}${ext}`;
  const filePath = path.join(UPLOADS_DIR, name);
  fs.writeFileSync(filePath, buffer);
  return `${BASE_PATH}/uploads/${name}`.replace(/\/+/g, "/") || `/uploads/${name}`;
}

/** Save a data URL (e.g. data:image/jpeg;base64,...) to uploads and return public URL. */
export function saveDataUrl(dataUrl: string): string {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) throw new Error("Invalid data URL");
  const mime = match[1];
  const base64 = match[2];
  const ext = mime === "image/png" ? ".png" : ".jpg";
  ensureDir(UPLOADS_DIR);
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}${ext}`;
  const filePath = path.join(UPLOADS_DIR, name);
  fs.writeFileSync(filePath, Buffer.from(base64, "base64"));
  return `${BASE_PATH}/uploads/${name}`.replace(/\/+/g, "/") || `/uploads/${name}`;
}
