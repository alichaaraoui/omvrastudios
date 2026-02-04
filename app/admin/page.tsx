"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Project, ProjectImage } from "@/lib/projects";
import { loadProjects } from "@/lib/projectSource";
import { isSupabaseConfigured } from "@/lib/supabase";
import * as projectSupabase from "@/lib/projectSupabase";
import {
  createProject,
  updateProject,
  deleteProject,
  importProjects,
} from "@/lib/projectApi";

const UPLOAD_TIMEOUT_MS = 30000;

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const refresh = useCallback(async () => {
    try {
      const data = await loadProjects();
      setProjects(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const openCreate = () => {
    setEditingProject(null);
    setFormOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditingProject(project);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingProject(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      if (isSupabaseConfigured()) await projectSupabase.deleteProject(id);
      else await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      window.dispatchEvent(new Event("projectsUpdated"));
    } catch (e) {
      alert("Delete failed: " + (e instanceof Error ? e.message : "Unknown error"));
    }
  };

  const handleExport = () => {
    const json = JSON.stringify(projects, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `omvra-projects-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !confirm("Replace all projects with this file?")) return;
    try {
      const list = JSON.parse(await file.text()) as Project[];
      if (!Array.isArray(list)) throw new Error("Invalid JSON");
      if (isSupabaseConfigured()) await projectSupabase.replaceAllProjects(list);
      else await importProjects(JSON.stringify(list));
      await refresh();
      alert("Import done.");
    } catch (err) {
      alert("Import failed: " + (err instanceof Error ? err.message : "Invalid file"));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-black">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold text-black">Admin</h1>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={openCreate}
              className="px-4 py-2 bg-black text-white border border-black hover:bg-white hover:text-black transition-colors"
            >
              New project
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="px-4 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors"
            >
              Export
            </button>
            <label className="px-4 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors cursor-pointer">
              Import
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
          </div>
        </header>

        {!isSupabaseConfigured() && (
          <p className="mb-6 p-3 text-sm bg-amber-50 text-amber-900 border border-amber-200">
            Set up Supabase (see README) so projects and image uploads work on the live site.
          </p>
        )}

        {formOpen && (
          <ProjectForm
            project={editingProject}
            onClose={closeForm}
            onSaved={() => {
              refresh();
              closeForm();
              window.dispatchEvent(new Event("projectsUpdated"));
            }}
          />
        )}

        {projects.length === 0 ? (
          <p className="text-gray-500 text-center py-12">No projects yet. Create one above.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {projects.map((project) => (
              <li key={project.id} className="border border-black p-4 bg-white">
                {project.images[0] && (
                  <div className="relative w-full aspect-square mb-3">
                    <Image
                      src={project.images[0].thumbnailUrl || project.images[0].url}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <h2 className="font-semibold text-black truncate">{project.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-2 mt-1">{project.description}</p>
                <p className="text-xs text-gray-400 mt-2">{project.images.length} image(s)</p>
                <div className="flex gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => openEdit(project)}
                    className="flex-1 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors text-sm"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(project.id)}
                    className="flex-1 py-2 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function ProjectForm({
  project,
  onClose,
  onSaved,
}: {
  project: Project | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [title, setTitle] = useState(project?.title ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [images, setImages] = useState<ProjectImage[]>(project?.images ?? []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    e.target.value = "";
    if (!files?.length) return;

    if (!isSupabaseConfigured()) {
      alert(
        "Image upload needs Supabase. See README: create a project at supabase.com, add the uploads bucket and policies, then set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY and redeploy."
      );
      return;
    }

    setUploading(true);
    try {
      const urls = await Promise.race([
        projectSupabase.uploadImages(Array.from(files)),
        new Promise<string[]>((_, rej) =>
          setTimeout(() => rej(new Error("Upload timed out. Check Supabase Storage (uploads bucket + policies).")), UPLOAD_TIMEOUT_MS)
        ),
      ]);
      const newImages = projectSupabase.urlsToProjectImages(urls, Array.from(files).map((f) => f.name));
      setImages((prev) => [...prev, ...newImages]);
    } catch (err) {
      console.error("Upload error:", err);
      const msg = err instanceof Error ? err.message : "Unknown error";
      alert("Upload failed: " + msg + "\n\nCheck the browser console (F12) for details. Ensure Supabase Storage has bucket 'uploads' (Public) and the policies from supabase-setup.sql are applied.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (id: string) => setImages((prev) => prev.filter((img) => img.id !== id));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || images.length === 0) {
      alert("Fill title, description, and add at least one image.");
      return;
    }

    setSaving(true);
    try {
      const payload: Project = {
        id: project?.id ?? `project-${Date.now()}`,
        title: title.trim(),
        description: description.trim(),
        images,
        createdAt: project?.createdAt ?? new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (isSupabaseConfigured()) {
        if (project) await projectSupabase.updateProject(project.id, payload);
        else await projectSupabase.createProject(payload);
      } else {
        if (project) await updateProject(project.id, payload);
        else await createProject(payload);
      }
      onSaved();
    } catch (err) {
      alert("Save failed: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white border border-black w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-black">{project ? "Edit project" : "New project"}</h2>
          <button type="button" onClick={onClose} className="text-black text-2xl leading-none" aria-label="Close">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-black text-black bg-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-black text-black bg-white h-28 resize-y"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">Images *</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              disabled={uploading}
              className="w-full text-sm text-black file:mr-2 file:py-1 file:px-3 file:border file:border-black file:bg-white file:cursor-pointer"
            />
            {uploading && <p className="text-sm text-gray-500 mt-1">Uploading…</p>}
          </div>

          {images.length > 0 && (
            <div>
              <p className="text-sm font-medium text-black mb-2">Added ({images.length})</p>
              <div className="grid grid-cols-3 gap-2">
                {images.map((img) => (
                  <div key={img.id} className="relative aspect-square">
                    <Image src={img.thumbnailUrl || img.url} alt="" fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2 bg-black text-white border border-black hover:bg-white hover:text-black transition-colors disabled:opacity-50"
            >
              {saving ? "Saving…" : project ? "Update" : "Create"}
            </button>
            <button type="button" onClick={onClose} className="py-2 px-4 border border-black text-black hover:bg-black hover:text-white transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
