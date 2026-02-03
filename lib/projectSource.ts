import { Project } from "./projects";
import { isSupabaseConfigured } from "./supabase";
import * as projectSupabase from "./projectSupabase";

const API = "/api";
const BASE_PATH =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_BASE_PATH) ||
  "/omvrastudios";

/** Load projects: Supabase (if configured) → API → static JSON. */
export async function loadProjects(): Promise<Project[]> {
  if (isSupabaseConfigured()) {
    try {
      return await projectSupabase.loadProjects();
    } catch (e) {
      console.error("Supabase loadProjects:", e);
    }
  }
  try {
    const res = await fetch(`${API}/projects`);
    if (res.ok) return await res.json();
  } catch {
    // no backend
  }
  try {
    const res = await fetch(`${BASE_PATH}/projects.json`);
    if (res.ok) {
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    }
  } catch (e) {
    console.error("Failed to load projects.json:", e);
  }
  return [];
}

/** Get one project by id. */
export async function getProjectById(id: string): Promise<Project | null> {
  if (isSupabaseConfigured()) {
    try {
      return await projectSupabase.getProjectById(id);
    } catch (e) {
      console.error("Supabase getProjectById:", e);
    }
  }
  try {
    const res = await fetch(`${API}/projects/${encodeURIComponent(id)}`);
    if (res.ok) return await res.json();
    if (res.status === 404) return null;
  } catch {
    // no backend
  }
  const projects = await loadProjects();
  return projects.find((p) => p.id === id) || null;
}
