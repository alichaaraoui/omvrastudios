import { Project, ProjectImage } from "./projects";

const API = "/api";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((err as { error?: string }).error || res.statusText);
  }
  return res.json();
}

export async function loadProjects(): Promise<Project[]> {
  const res = await fetch(`${API}/projects`);
  return handleResponse<Project[]>(res);
}

export async function getProjectById(id: string): Promise<Project | null> {
  const res = await fetch(`${API}/projects/${encodeURIComponent(id)}`);
  if (res.status === 404) return null;
  return handleResponse<Project>(res);
}

export async function createProject(project: Project): Promise<Project> {
  const res = await fetch(`${API}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  return handleResponse<Project>(res);
}

export async function updateProject(id: string, project: Project): Promise<Project> {
  const res = await fetch(`${API}/projects/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  return handleResponse<Project>(res);
}

export async function deleteProject(id: string): Promise<void> {
  const res = await fetch(`${API}/projects/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  await handleResponse<{ ok: boolean }>(res);
}

export async function uploadImages(files: File[]): Promise<string[]> {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  const res = await fetch(`${API}/upload`, {
    method: "POST",
    body: formData,
  });
  const data = await handleResponse<{ urls: string[] }>(res);
  return data.urls;
}

/** Build ProjectImage[] from uploaded URLs (one URL per file, optional titles). */
export function urlsToProjectImages(
  urls: string[],
  fileNames?: string[]
): ProjectImage[] {
  return urls.map((url, i) => ({
    id: `${Date.now()}-${i}`,
    url,
    thumbnailUrl: url,
    title: fileNames?.[i] ?? "",
  }));
}

export async function exportProjects(): Promise<string> {
  const projects = await loadProjects();
  return JSON.stringify(projects, null, 2);
}

export async function importProjects(jsonString: string): Promise<void> {
  const projects = JSON.parse(jsonString) as Project[];
  const res = await fetch(`${API}/projects/import`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(projects),
  });
  await handleResponse<{ ok: boolean }>(res);
}
