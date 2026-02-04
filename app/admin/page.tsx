"use client";

import { useState, useEffect, useRef } from "react";
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

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<"none" | "create" | "edit">("none");
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await loadProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setEditingProject(null);
    setModal("create");
  }

  function openEdit(p: Project) {
    setEditingProject(p);
    setModal("edit");
  }

  function closeModal() {
    setModal("none");
    setEditingProject(null);
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    try {
      if (isSupabaseConfigured()) await projectSupabase.deleteProject(id);
      else await deleteProject(id);
      setProjects((prev) => prev.filter((x) => x.id !== id));
      window.dispatchEvent(new Event("projectsUpdated"));
    } catch (e) {
      alert("Delete failed: " + (e instanceof Error ? e.message : "Error"));
    }
  }

  function onExport() {
    const blob = new Blob([JSON.stringify(projects, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "omvra-projects.json";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  async function onImport(ev: React.ChangeEvent<HTMLInputElement>) {
    const file = ev.target.files?.[0];
    ev.target.value = "";
    if (!file || !confirm("Replace all projects with this file?")) return;
    try {
      const list = JSON.parse(await file.text()) as Project[];
      if (!Array.isArray(list)) throw new Error("Invalid JSON");
      if (isSupabaseConfigured()) await projectSupabase.replaceAllProjects(list);
      else await importProjects(JSON.stringify(list));
      await load();
      alert("Done.");
    } catch (e) {
      alert("Import failed: " + (e instanceof Error ? e.message : "Error"));
    }
  }

  function onSaved() {
    load();
    closeModal();
    window.dispatchEvent(new Event("projectsUpdated"));
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-black">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-black mb-4">Admin</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-800 border border-red-200 text-sm">
            {error}
          </div>
        )}

        {!isSupabaseConfigured() && (
          <div className="mb-4 p-3 bg-amber-50 text-amber-900 border border-amber-200 text-sm">
            Add Supabase URL and key (see README) for projects and uploads on the live site.
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            type="button"
            onClick={openCreate}
            className="px-4 py-2 bg-black text-white border border-black hover:bg-white hover:text-black"
          >
            New project
          </button>
          <button type="button" onClick={onExport} className="px-4 py-2 border border-black text-black hover:bg-black hover:text-white">
            Export
          </button>
          <label className="px-4 py-2 border border-black text-black hover:bg-black hover:text-white cursor-pointer">
            Import
            <input type="file" accept=".json" onChange={onImport} className="hidden" />
          </label>
        </div>

        {projects.length === 0 ? (
          <p className="text-gray-500">No projects. Click New project to add one.</p>
        ) : (
          <ul className="space-y-4">
            {projects.map((p) => (
              <li key={p.id} className="border border-black p-4 flex gap-4">
                {p.images[0] ? (
                  <img
                    src={p.images[0].url || p.images[0].thumbnailUrl}
                    alt=""
                    className="w-24 h-24 object-cover flex-shrink-0 bg-gray-100"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-black truncate">{p.title}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2">{p.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{p.images.length} image(s)</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => openEdit(p)}
                      className="px-3 py-1 text-sm border border-black text-black hover:bg-black hover:text-white"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(p.id)}
                      className="px-3 py-1 text-sm border border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {(modal === "create" || modal === "edit") && (
          <ProjectFormModal
            project={editingProject}
            onClose={closeModal}
            onSaved={onSaved}
          />
        )}
      </div>
    </div>
  );
}

function ProjectFormModal({
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
  const [saveError, setSaveError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitle(project?.title ?? "");
    setDescription(project?.description ?? "");
    setImages(project?.images ?? []);
  }, [project]);

  async function handleFileChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const files = ev.target.files;
    if (!files?.length) return;
    const names = Array.from(files).map((f) => f.name);
    setSelectedNames(names);
    setUploadError(null);
    if (!isSupabaseConfigured()) {
      setUploadError("Supabase is required for upload. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
      return;
    }
    setUploading(true);
    try {
      const urls = await projectSupabase.uploadImages(Array.from(files));
      const newImages: ProjectImage[] = urls.map((url, i) => ({
        id: `img-${Date.now()}-${i}`,
        url,
        thumbnailUrl: url,
        title: names[i] ?? "",
      }));
      setImages((prev) => [...prev, ...newImages]);
      setSelectedNames([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Upload failed";
      setUploadError(msg);
    } finally {
      setUploading(false);
    }
  }

  function removeImage(id: string) {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!title.trim()) {
      alert("Enter a title.");
      return;
    }
    if (!description.trim()) {
      alert("Enter a description.");
      return;
    }
    if (images.length === 0) {
      alert("Add at least one image.");
      return;
    }
    setSaving(true);
    setSaveError(null);
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
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Save failed";
      setSaveError(msg);
      alert(msg);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white border-2 border-black w-full max-w-md max-h-[90vh] overflow-y-auto p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-black">{project ? "Edit project" : "New project"}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-black text-2xl leading-none hover:opacity-70"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {saveError && (
          <p className="mb-3 text-sm text-red-600">{saveError}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-black mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-black text-black bg-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-black mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-black text-black bg-white resize-y"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-black mb-1">Images</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full text-sm text-black file:mr-2 file:py-2 file:px-4 file:border file:border-black file:bg-white file:cursor-pointer"
            />
            {selectedNames.length > 0 && (
              <p className="mt-1 text-sm text-gray-700">
                {uploading ? "Uploading… " : "Selected: "}
                {selectedNames.join(", ")}
              </p>
            )}
            {uploadError && <p className="mt-1 text-sm text-red-600">{uploadError}</p>}
          </div>

          {images.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-black mb-2">Added: {images.length}</p>
              <div className="flex flex-wrap gap-2">
                {images.map((img) => (
                  <div key={img.id} className="relative">
                    <img
                      src={img.url || img.thumbnailUrl}
                      alt=""
                      className="w-20 h-20 object-cover border border-black"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs flex items-center justify-center hover:bg-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-black text-white border border-black hover:bg-white hover:text-black disabled:opacity-50"
            >
              {saving ? "Saving…" : project ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-black text-black hover:bg-black hover:text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
