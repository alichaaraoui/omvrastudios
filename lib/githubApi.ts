import { Project } from "./projects";

const GITHUB_API = "https://api.github.com";

export function getRepo(): { owner: string; repo: string } | null {
  const s = typeof process !== "undefined" && process.env.NEXT_PUBLIC_GITHUB_REPO;
  if (!s || typeof s !== "string") return null;
  const [owner, repo] = s.split("/").filter(Boolean);
  return owner && repo ? { owner, repo } : null;
}

/** Get file content from repo (returns decoded string or null). */
export async function getFile(
  token: string,
  path: string
): Promise<string | null> {
  const r = getRepo();
  if (!r) return null;
  const res = await fetch(
    `${GITHUB_API}/repos/${r.owner}/${r.repo}/contents/${path}`,
    {
      headers: {
        Accept: "application/vnd.github.raw",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok) return null;
  return res.text();
}

/** Create or update a file in the repo. content = raw string. */
export async function putFile(
  token: string,
  path: string,
  content: string,
  message: string
): Promise<void> {
  const r = getRepo();
  if (!r) throw new Error("NEXT_PUBLIC_GITHUB_REPO not set");
  const body: { message: string; content: string; sha?: string } = {
    message,
    content: btoa(unescape(encodeURIComponent(content))),
  };
  const existing = await fetch(
    `${GITHUB_API}/repos/${r.owner}/${r.repo}/contents/${path}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (existing.ok) {
    const data = await existing.json();
    body.sha = (data as { sha?: string }).sha;
  }
  const res = await fetch(
    `${GITHUB_API}/repos/${r.owner}/${r.repo}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { message?: string }).message || res.statusText);
  }
}

/** Upload an image to public/uploads/ in the repo; returns path like /omvrastudios/uploads/xxx.jpg */
export async function uploadImageToRepo(
  token: string,
  file: File,
  basePath: string
): Promise<string> {
  const ext = file.name.replace(/^.*\./, "") || "jpg";
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`;
  const path = `public/uploads/${name}`;
  const buf = await file.arrayBuffer();
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  const base64 = btoa(binary);
  const r = getRepo();
  if (!r) throw new Error("NEXT_PUBLIC_GITHUB_REPO not set");
  const body: { message: string; content: string; sha?: string } = {
    message: `Upload ${name}`,
    content: base64,
  };
  const existing = await fetch(
    `${GITHUB_API}/repos/${r.owner}/${r.repo}/contents/${path}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (existing.ok) {
    const data = await existing.json();
    body.sha = (data as { sha?: string }).sha;
  }
  const res = await fetch(
    `${GITHUB_API}/repos/${r.owner}/${r.repo}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { message?: string }).message || res.statusText);
  }
  return `${basePath}/uploads/${name}`;
}

/** Load projects from repo (public/projects.json). */
export async function loadProjectsFromRepo(
  token: string
): Promise<Project[]> {
  const raw = await getFile(token, "public/projects.json");
  if (!raw) return [];
  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

/** Save full projects array to repo. */
export async function saveProjectsToRepo(
  token: string,
  projects: Project[]
): Promise<void> {
  await putFile(
    token,
    "public/projects.json",
    JSON.stringify(projects, null, 2),
    "Update projects"
  );
}
