import { Project, ProjectImage } from "./projects";
import { Photo } from "./data";
import { loadProjects } from "./projectStorage";

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
        // Store project ID in a way we can access it
        // We'll use the series field to identify project photos
      });
    });
  });

  return photos;
}

// Extract project ID from photo ID (format: projectId-imageId)
export function getProjectIdFromPhotoId(photoId: string): string | null {
  // Check if this is a project photo (format: projectId-imageId)
  const parts = photoId.split('-');
  if (parts.length >= 2) {
    // Try to find if this matches a project ID pattern
    // For now, we'll check if loading projects returns a match
    return parts[0]; // Return the first part as potential project ID
  }
  return null;
}

// Check if a photo ID belongs to a project
export function isProjectPhoto(photoId: string): boolean {
  return photoId.includes('-') && photoId.split('-').length >= 2;
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

// Get a project by ID
export async function getProjectById(projectId: string): Promise<Project | null> {
  try {
    const projects = await loadProjects();
    return projects.find(p => p.id === projectId) || null;
  } catch (error) {
    console.error("Failed to load project:", error);
    return null;
  }
}

