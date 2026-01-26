"use client";

import { useState, useEffect } from "react";
import { Project, ProjectImage } from "@/lib/projects";
import { loadProjects, saveProjects, uploadImages, exportProjects, importProjects } from "@/lib/indexedDBStorage";
import Image from "next/image";

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await loadProjects();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const updatedProjects = projects.filter((p) => p.id !== id);
      await saveProjects(updatedProjects);
      setProjects(updatedProjects);
    } catch (error) {
      console.error("Failed to delete project:", error);
      alert("Failed to delete project: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  const handleExportProjects = async () => {
    try {
      const json = await exportProjects();
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `omvra-projects-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      alert("Projects exported successfully!");
    } catch (error) {
      console.error("Export error:", error);
      alert("Failed to export projects");
    }
  };

  const handleImportProjects = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!confirm("This will replace all existing projects. Continue?")) {
      e.target.value = "";
      return;
    }

    try {
      const text = await file.text();
      await importProjects(text);
      await fetchProjects();
      alert("Projects imported successfully!");
    } catch (error) {
      console.error("Import error:", error);
      alert("Failed to import projects: " + (error instanceof Error ? error.message : "Invalid file"));
    } finally {
      e.target.value = "";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-black">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-black">Admin - Project Management</h1>
          <button
            onClick={handleCreateProject}
            className="px-6 py-2 bg-black text-white border border-black hover:bg-white hover:text-black transition-colors"
          >
            + Create New Project
          </button>
        </div>

        <div className="mb-6 p-4 bg-blue-50 border border-blue-200">
          <p className="text-sm text-blue-800 mb-2">
            <strong>Note:</strong> Projects are saved to your browser&apos;s IndexedDB (much larger storage than localStorage). This works in both development and production!
          </p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleExportProjects}
              className="px-4 py-1 text-xs bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Export Projects (Backup)
            </button>
            <label className="px-4 py-1 text-xs bg-green-600 text-white hover:bg-green-700 transition-colors cursor-pointer">
              Import Projects
              <input
                type="file"
                accept=".json"
                onChange={handleImportProjects}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {showForm && (
          <ProjectForm
            project={editingProject}
            onClose={() => {
              setShowForm(false);
              setEditingProject(null);
            }}
            onSave={fetchProjects}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
            />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No projects yet. Create your first project!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  onEdit,
  onDelete,
}: {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="border border-black bg-white p-4">
      {project.images.length > 0 && (
        <div className="relative w-full aspect-square mb-4">
          <Image
            src={project.images[0].thumbnailUrl || project.images[0].url}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <h3 className="font-bold text-lg mb-2 text-black">{project.title}</h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>
      <p className="text-xs text-gray-400 mb-4">{project.images.length} image(s)</p>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(project)}
          className="flex-1 px-4 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(project.id)}
          className="flex-1 px-4 py-2 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function ProjectForm({
  project,
  onClose,
  onSave,
}: {
  project: Project | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const [title, setTitle] = useState(project?.title || "");
  const [description, setDescription] = useState(project?.description || "");
  const [images, setImages] = useState<ProjectImage[]>(project?.images || []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      const fileArray = Array.from(files);
      const urls = await uploadImages(fileArray);

      if (urls.length > 0) {
        const newImages: ProjectImage[] = urls.map((url: string, index: number) => ({
          id: `${Date.now()}-${index}`,
          url: url,
          thumbnailUrl: url,
          title: fileArray[index]?.name || "",
        }));
        setImages([...images, ...newImages]);
        // Reset file input
        e.target.value = "";
      } else {
        alert("No images were uploaded. Please try again.");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      const errorMsg = error?.message || "Unknown error";
      if (errorMsg.includes("quota") || errorMsg.includes("QuotaExceeded")) {
        alert(
          "Storage limit exceeded! Images are too large.\n\n" +
          "Solutions:\n" +
          "1. Use fewer or smaller images\n" +
          "2. Images are being compressed, but may still be too large\n" +
          "3. Consider using a cloud image service (see instructions in README)"
        );
      } else {
        alert(`Failed to upload images: ${errorMsg}`);
      }
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (imageId: string) => {
    setImages(images.filter((img) => img.id !== imageId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || images.length === 0) {
      alert("Please fill in all fields and upload at least one image");
      return;
    }

    setSaving(true);
    try {
      const projectData: Project = {
        id: project?.id || `project-${Date.now()}`,
        title,
        description,
        images,
        createdAt: project?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Load existing projects
      const existingProjects = await loadProjects();
      let updatedProjects: Project[];

      if (project) {
        // Update existing project
        updatedProjects = existingProjects.map((p) =>
          p.id === project.id ? projectData : p
        );
      } else {
        // Add new project
        updatedProjects = [...existingProjects, projectData];
      }

      // Save to IndexedDB
      await saveProjects(updatedProjects);
      onSave();
      onClose();
    } catch (error: any) {
      console.error("Save error:", error);
      const errorMessage = error?.message || (error instanceof Error ? error.message : "Unknown error");
      if (errorMessage.includes("QuotaExceeded") || errorMessage.includes("quota") || errorMessage.includes("too large")) {
        alert(
          "Storage limit exceeded!\n\n" +
          "Your projects data is too large for browser storage (~5-10MB limit).\n\n" +
          "Solutions:\n" +
          "1. Remove some images from projects\n" +
          "2. Use smaller/compressed images (they're already being compressed)\n" +
          "3. Delete old projects\n" +
          "4. Set up a backend API for image storage (recommended)\n\n" +
          "See ADMIN_README.md for instructions on setting up a backend API."
        );
      } else {
        alert(`Failed to save project: ${errorMessage}`);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-black p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">
            {project ? "Edit Project" : "Create New Project"}
          </h2>
          <button
            onClick={onClose}
            className="text-black hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Project Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-black text-black bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-black text-black bg-white h-32"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Images *
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              disabled={uploading}
              className="w-full px-4 py-2 border border-black text-black bg-white"
            />
            {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
          </div>

          {images.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Uploaded Images ({images.length})
              </label>
              <div className="grid grid-cols-3 gap-4">
                {images.map((image) => (
                  <div key={image.id} className="relative">
                    <div className="relative w-full aspect-square">
                      <Image
                        src={image.thumbnailUrl || image.url}
                        alt={image.title || "Project image"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(image.id)}
                      className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-6 py-2 bg-black text-white border border-black hover:bg-white hover:text-black transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : project ? "Update Project" : "Create Project"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

