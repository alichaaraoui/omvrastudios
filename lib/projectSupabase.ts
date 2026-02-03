import { Project, ProjectImage } from "./projects";
import { getSupabase } from "./supabase";

const BUCKET = "uploads";
const TABLE = "projects";

export async function loadProjects(): Promise<Project[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Supabase loadProjects:", error);
    return [];
  }
  return (data || []).map(rowToProject);
}

function rowToProject(row: Record<string, unknown>): Project {
  return {
    id: String(row.id),
    title: String(row.title ?? ""),
    description: String(row.description ?? ""),
    images: Array.isArray(row.images) ? (row.images as ProjectImage[]) : [],
    createdAt: String(row.created_at ?? row.createdAt ?? ""),
    updatedAt: String(row.updated_at ?? row.updatedAt ?? ""),
  };
}

export async function getProjectById(id: string): Promise<Project | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase.from(TABLE).select("*").eq("id", id).single();
  if (error || !data) return null;
  return rowToProject(data);
}

export async function createProject(project: Project): Promise<Project> {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase not configured");

  const row = projectToRow(project);
  const { error } = await supabase.from(TABLE).insert(row);
  if (error) throw new Error(error.message);
  return project;
}

export async function updateProject(id: string, project: Project): Promise<Project> {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase not configured");

  const row = projectToRow(project);
  const { error } = await supabase.from(TABLE).update(row).eq("id", id);
  if (error) throw new Error(error.message);
  return project;
}

export async function deleteProject(id: string): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase not configured");

  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw new Error(error.message);
}

function projectToRow(p: Project): Record<string, unknown> {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    images: p.images,
    created_at: p.createdAt,
    updated_at: p.updatedAt,
  };
}

/** Upload files to Supabase Storage; returns public URLs. */
export async function uploadImages(files: File[]): Promise<string[]> {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase not configured");

  const urls: string[] = [];
  for (const file of files) {
    const ext = file.name.replace(/^.*\./, "") || "jpg";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`;
    const { data, error } = await supabase.storage.from(BUCKET).upload(path, file, {
      contentType: file.type || "image/jpeg",
      upsert: false,
    });
    if (error) throw new Error(error.message);
    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(data.path);
    urls.push(urlData.publicUrl);
  }
  return urls;
}

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

/** Replace all projects (for import). */
export async function replaceAllProjects(projects: Project[]): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase not configured");

  const { data: existing } = await supabase.from(TABLE).select("id");
  if (existing?.length) {
    for (const row of existing) {
      await supabase.from(TABLE).delete().eq("id", row.id);
    }
  }

  if (projects.length === 0) return;
  const rows = projects.map(projectToRow);
  const { error: insertError } = await supabase.from(TABLE).insert(rows);
  if (insertError) throw new Error(insertError.message);
}
