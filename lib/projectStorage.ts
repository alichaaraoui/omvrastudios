import { Project, ProjectImage } from "./projects";
import { compressImage } from "./imageUpload";

const STORAGE_KEY = "omvra_projects";
// Base path matches next.config.mjs basePath
const BASE_PATH = "/omvrastudios";
const PUBLIC_PROJECTS_FILE = `${BASE_PATH}/projects.json`;

// Maximum size for localStorage (rough estimate - localStorage is typically 5-10MB)
const MAX_STORAGE_SIZE = 4 * 1024 * 1024; // 4MB to be safe

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

// Save projects to localStorage with size check
export function saveProjects(projects: Project[]): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const data = JSON.stringify(projects);
    const size = new Blob([data]).size;

    if (size > MAX_STORAGE_SIZE) {
      throw new Error(
        `Projects data is too large (${(size / 1024 / 1024).toFixed(2)}MB). ` +
        `Please reduce the number of images or use smaller images. ` +
        `Consider using a cloud storage service for images.`
      );
    }

    localStorage.setItem(STORAGE_KEY, data);
  } catch (error: any) {
    if (error.name === 'QuotaExceededError' || error.message.includes('too large')) {
      throw new Error(
        "Storage quota exceeded! Images are too large. " +
        "Please use fewer images or compress them more. " +
        "Consider using a cloud image hosting service."
      );
    }
    throw error;
  }
}

// Handle image upload with compression
export async function uploadImages(files: File[]): Promise<string[]> {
  const urls: string[] = [];
  
  for (const file of files) {
    try {
      // Compress image before storing
      const compressedDataUrl = await compressImage(file, 1920, 0.7);
      urls.push(compressedDataUrl);
    } catch (error) {
      console.error("Failed to process file:", error);
      throw new Error(`Failed to process ${file.name}: ${error}`);
    }
  }
  
  return urls;
}

