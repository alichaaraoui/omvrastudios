import { Project, ProjectImage } from "./projects";

const DB_NAME = "omvra_projects";
const DB_VERSION = 1;
const STORE_NAME = "projects";

// Initialize IndexedDB
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("IndexedDB only works in browser"));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
  });
}

// Load all projects from IndexedDB
export async function loadProjects(): Promise<Project[]> {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const projects = request.result || [];
        resolve(projects);
      };

      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Failed to load projects from IndexedDB:", error);
    return [];
  }
}

// Save projects to IndexedDB
export async function saveProjects(projects: Project[]): Promise<void> {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    // Clear existing projects
    await new Promise<void>((resolve, reject) => {
      const clearRequest = store.clear();
      clearRequest.onsuccess = () => resolve();
      clearRequest.onerror = () => reject(clearRequest.error);
    });

    // Add all projects
    for (const project of projects) {
      await new Promise<void>((resolve, reject) => {
        const addRequest = store.add(project);
        addRequest.onsuccess = () => resolve();
        addRequest.onerror = () => reject(addRequest.error);
      });
    }
  } catch (error) {
    console.error("Failed to save projects to IndexedDB:", error);
    throw error;
  }
}

// Convert file to base64 URL
export function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Handle image upload (stores as base64 in IndexedDB)
export async function uploadImages(files: File[]): Promise<string[]> {
  const urls: string[] = [];
  for (const file of files) {
    try {
      // Check file size (limit to 5MB per file to avoid issues)
      if (file.size > 5 * 1024 * 1024) {
        console.warn(`File ${file.name} is too large (${file.size} bytes), skipping`);
        continue;
      }
      const dataURL = await fileToDataURL(file);
      urls.push(dataURL);
    } catch (error) {
      console.error("Failed to process file:", error);
    }
  }
  return urls;
}

// Export projects as JSON (for backup)
export async function exportProjects(): Promise<string> {
  const projects = await loadProjects();
  return JSON.stringify(projects, null, 2);
}

// Import projects from JSON (for restore)
export async function importProjects(jsonString: string): Promise<void> {
  try {
    const projects = JSON.parse(jsonString) as Project[];
    await saveProjects(projects);
  } catch (error) {
    console.error("Failed to import projects:", error);
    throw new Error("Invalid JSON format");
  }
}

