import { Project } from "./projects";
import { Photo } from "./data";
import { loadProjects, getProjectById } from "./projectSource";

// One gallery item per project (first image only); clicking opens project detail page
export function projectsToPhotos(projects: Project[]): Photo[] {
  return projects
    .filter((p) => p.images?.length > 0)
    .map((project) => {
      const first = project.images[0];
      return {
        id: project.id,
        title: project.title,
        series: project.title,
        location: "",
        year: new Date(project.createdAt).getFullYear().toString(),
        thumbnailUrl: first.thumbnailUrl || first.url,
        imageUrl: first.url,
        description: project.description,
        projectId: project.id,
      };
    });
}

// Get all photos from projects (for backward compatibility)
export async function getAllPhotos(): Promise<Photo[]> {
  try {
    const projects = await loadProjects();
    return projectsToPhotos(projects);
  } catch (error) {
    console.error("Failed to load photos from projects:", error);
    return [];
  }
}

// Re-export for project detail page
export { getProjectById } from "./projectSource";

