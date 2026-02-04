"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getProjectById } from "@/lib/projectUtils";
import { Project } from "@/lib/projects";
import Image from "next/image";
import BackButton from "@/components/BackButton";

export default function ProjectPageClient() {
  const searchParams = useSearchParams();
  const projectId = searchParams?.get("id") ?? "";
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      if (!projectId) {
        setLoading(false);
        return;
      }
      try {
        const loadedProject = await getProjectById(projectId);
        setProject(loadedProject);
      } catch (error) {
        console.error("Failed to load project:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-[100dvh] min-h-screen bg-white flex items-center justify-center">
        <p className="text-black">Loading project...</p>
      </div>
    );
  }

  if (!projectId || !project || project.images.length === 0) {
    return (
      <div className="min-h-[100dvh] min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-black mb-4">Project not found</p>
          <BackButton />
        </div>
      </div>
    );
  }

  const [heroImage, ...restImages] = project.images;

  return (
    <div className="min-h-[100dvh] min-h-screen bg-white w-full max-w-[100vw] overflow-x-hidden">
      {/* Fixed Back Button - safe area, 44px touch target */}
      <div
        className="fixed z-50 flex items-center justify-center min-h-[44px] min-w-[44px]"
        style={{ top: "max(1rem, env(safe-area-inset-top))", left: "max(1rem, env(safe-area-inset-left))" }}
      >
        <BackButton />
      </div>

      {/* 1. Hero: first image, full viewport */}
      <section className="min-h-[100dvh] min-h-screen w-full max-w-[100vw] relative flex items-center justify-center bg-black overflow-hidden">
        <Image
          src={heroImage.url}
          alt={heroImage.title || project.title}
          fill
          className="object-contain max-w-full max-h-full"
          priority
          sizes="100vw"
        />
      </section>

      {/* 2. Description block */}
      <section className="w-full max-w-[100vw] bg-white border-t border-black py-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-black mb-4">
            {project.title}
          </h1>
          <p className="text-black leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
        </div>
      </section>

      {/* 3. Rest of images stacked, full viewport each */}
      {restImages.map((image) => (
        <section
          key={image.id}
          className="min-h-[100dvh] min-h-screen w-full max-w-[100vw] relative flex items-center justify-center bg-black overflow-hidden"
        >
          <Image
            src={image.url}
            alt={image.title || project.title}
            fill
            className="object-contain max-w-full max-h-full"
            sizes="100vw"
          />
        </section>
      ))}
    </div>
  );
}
