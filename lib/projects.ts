export interface ProjectImage {
  id: string;
  url: string;
  thumbnailUrl: string;
  title?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  images: ProjectImage[];
  createdAt: string;
  updatedAt: string;
}

// This will be loaded from a JSON file or API
export let projects: Project[] = [];

// Function to load projects from storage
export async function loadProjects(): Promise<Project[]> {
  try {
    const response = await fetch('/api/projects');
    const data = await response.json();
    projects = data;
    return data;
  } catch (error) {
    console.error('Failed to load projects:', error);
    return [];
  }
}

// Function to save projects to storage
export async function saveProjects(newProjects: Project[]): Promise<void> {
  projects = newProjects;
  await fetch('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProjects),
  });
}

