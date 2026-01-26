import { Project, ProjectImage } from "./projects";
import { Photo } from "./data";

// Convert projects to photos format for existing galleries
export function projectsToPhotos(projects: Project[]): Photo[] {
  const photos: Photo[] = [];

  projects.forEach((project) => {
    project.images.forEach((image, index) => {
      photos.push({
        id: `${project.id}-${image.id}`,
        title: image.title || project.title,
        series: project.title,
        location: "",
        year: new Date(project.createdAt).getFullYear().toString(),
        thumbnailUrl: image.thumbnailUrl || image.url,
        imageUrl: image.url,
        description: project.description,
      });
    });
  });

  return photos;
}

// Get all photos from projects (for backward compatibility)
export async function getAllPhotos(): Promise<Photo[]> {
  try {
    const response = await fetch("/api/projects");
    if (response.ok) {
      const projects: Project[] = await response.json();
      return projectsToPhotos(projects);
    }
  } catch (error) {
    console.error("Failed to load photos from projects:", error);
  }
  return [];
}

