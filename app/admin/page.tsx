"use client";

import { useState, useEffect } from "react";
import { Project, ProjectImage } from "@/lib/projects";
import { loadProjects } from "@/lib/projectSource";
import {
  createProject,
  updateProject,
  deleteProject,
  uploadImages,
  urlsToProjectImages,
  exportProjects,
  importProjects,
} from "@/lib/projectApi";
import { getRepo, getFile, putFile } from "@/lib/githubApi";
import Image from "next/image";

const TOKEN_KEY = "omvra_github_token";

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [githubToken, setGithubToken] = useState("");
  const [tokenInput, setTokenInput] = useState("");

  useEffect(() => {
    const saved = typeof sessionStorage !== "undefined" ? sessionStorage.getItem(TOKEN_KEY) : null;
    if (saved) setGithubToken(saved);
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

  const saveToken = () => {
    const t = tokenInput.trim();
    if (t) {
      sessionStorage.setItem(TOKEN_KEY, t);
      setGithubToken(t);
      setTokenInput("");
    }
  };

  const clearToken = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setGithubToken("");
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
      if (githubToken && getRepo()) {
        const raw = await getFile(githubToken, "public/projects.json");
        const list: Project[] = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(list)) throw new Error("Invalid projects.json");
        const next = list.filter((p) => p.id !== id);
        await putFile(
          githubToken,
          "public/projects.json",
          JSON.stringify(next, null, 2),
          "Delete project"
        );
      } else {
        await deleteProject(id);
      }
      setProjects(projects.filter((p) => p.id !== id));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("projectsUpdated"));
      }
    } catch (error) {
      console.error("Failed to delete project:", error);
      alert("Failed to delete project: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  const handleExportProjects = async () => {
    try {
      const json = projects.length ? JSON.stringify(projects, null, 2) : "[]";
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
      const list = JSON.parse(text) as Project[];
      if (!Array.isArray(list)) throw new Error("Invalid JSON");

      if (githubToken && getRepo()) {
        await putFile(
          githubToken,
          "public/projects.json",
          JSON.stringify(list, null, 2),
          "Import projects"
        );
      } else {
        await importProjects(text);
      }
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
            <strong>GitHub Pages:</strong> To add projects on the live site, add a GitHub token (repo scope) below. Projects and images will be saved to the repo; the next deploy will show them.
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <input
              type="password"
              placeholder="GitHub token (repo)"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              className="px-3 py-1 border border-black text-black text-sm max-w-xs"
            />
            <button
              type="button"
              onClick={saveToken}
              className="px-4 py-1 text-xs bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Save token
            </button>
            {githubToken && (
              <button
                type="button"
                onClick={clearToken}
                className="px-4 py-1 text-xs bg-gray-500 text-white hover:bg-gray-600 transition-colors"
              >
                Clear token
              </button>
            )}
            <button
              onClick={handleExportProjects}
              className="px-4 py-1 text-xs bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Export (Backup)
            </button>
            <label className="px-4 py-1 text-xs bg-green-600 text-white hover:bg-green-700 transition-colors cursor-pointer">
              Import
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
            githubToken={githubToken}
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

const BASE_PATH =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_BASE_PATH) || "/omvrastudios";

function ProjectForm({
  project,
  githubToken,
  onClose,
  onSave,
}: {
  project: Project | null;
  githubToken: string;
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
      let urls: string[];

      if (githubToken && getRepo()) {
        const { uploadImageToRepo } = await import("@/lib/githubApi");
        urls = [];
        for (const file of fileArray) {
          const url = await uploadImageToRepo(githubToken, file, BASE_PATH);
          urls.push(url);
        }
      } else {
        urls = await uploadImages(fileArray);
      }

      if (urls.length > 0) {
        const newImages = urlsToProjectImages(urls, fileArray.map((f) => f.name));
        setImages((prev) => [...prev, ...newImages]);
        e.target.value = "";
      } else {
        alert("No images were uploaded. Please try again.");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      alert("Failed to upload images: " + (error?.message || "Unknown error"));
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

      if (githubToken && getRepo()) {
        const raw = await getFile(githubToken, "public/projects.json");
        let list: Project[] = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(list)) list = [];
        const idx = list.findIndex((p) => p.id === projectData.id);
        if (idx >= 0) list[idx] = projectData;
        else list.push(projectData);
        await putFile(
          githubToken,
          "public/projects.json",
          JSON.stringify(list, null, 2),
          project ? "Update project" : "Add project"
        );
      } else {
        if (project) {
          await updateProject(project.id, projectData);
        } else {
          await createProject(projectData);
        }
      }

      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("projectsUpdated"));
      }
      onSave();
      onClose();
    } catch (error: any) {
      console.error("Save error:", error);
      alert("Failed to save project: " + (error?.message || "Unknown error"));
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

