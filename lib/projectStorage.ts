import { Project, ProjectImage } from "./projects";

const STORAGE_KEY = "omvra_projects";
// Base path matches next.config.mjs basePath
const BASE_PATH = "/omvrastudios";
const PUBLIC_PROJECTS_FILE = `${BASE_PATH}/projects.json`;

// Load projects from localStorage or public file
export async function loadProjects(): Promise<Project[]> {
  // Only run on client side
  if (typeof window === "undefined") {
    return [];
  }

  // Try localStorage first (for admin edits)
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to parse stored projects:", e);
  }

  // Fallback to public file
  try {
    const response = await fetch(PUBLIC_PROJECTS_FILE);
    if (response.ok) {
      const projects = await response.json();
      return projects;
    }
  } catch (e) {
    // Silently fail if file doesn't exist (expected on first run)
    console.log("Projects file not found, starting with empty projects");
  }

  return [];
}

// Save projects to localStorage
export function saveProjects(projects: Project[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }
}

// Convert uploaded file to base64 URL
export function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Handle image upload (stores as base64 in localStorage)
export async function uploadImages(files: File[]): Promise<string[]> {
  const urls: string[] = [];
  for (const file of files) {
    try {
      const dataURL = await fileToDataURL(file);
      urls.push(dataURL);
    } catch (error) {
      console.error("Failed to process file:", error);
    }
  }
  return urls;
}

