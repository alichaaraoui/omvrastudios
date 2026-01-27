"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getProjectById } from "@/lib/projectUtils";
import { Project } from "@/lib/projects";
import Image from "next/image";
import BackButton from "@/components/BackButton";

export default function ProjectPageClient() {
  const params = useParams();
  const projectId = params?.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    async function loadProject() {
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
      <div className="fixed inset-0 w-screen h-screen bg-white flex items-center justify-center">
        <p className="text-black">Loading project...</p>
      </div>
    );
  }

  if (!project || project.images.length === 0) {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-black mb-4">Project not found</p>
          <BackButton />
        </div>
      </div>
    );
  }

  const selectedImage = project.images[selectedImageIndex];

  return (
    <div className="fixed inset-0 w-screen h-screen bg-white overflow-hidden">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-50">
        <BackButton />
      </div>

      {/* Main Image Display */}
      <div className="w-full h-full flex flex-col">
        {/* Image Area */}
        <div className="flex-1 relative bg-black">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={selectedImage.url}
              alt={selectedImage.title || project.title}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Image Navigation */}
          {project.images.length > 1 && (
            <>
              <button
                onClick={() => setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : project.images.length - 1))}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-3 hover:bg-opacity-75 transition-opacity"
                aria-label="Previous image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={() => setSelectedImageIndex((prev) => (prev < project.images.length - 1 ? prev + 1 : 0))}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-3 hover:bg-opacity-75 transition-opacity"
                aria-label="Next image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}

          {/* Image Counter */}
          {project.images.length > 1 && (
            <div className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white px-3 py-1 text-sm">
              {selectedImageIndex + 1} / {project.images.length}
            </div>
          )}
        </div>

        {/* Project Info Bar */}
        <div className="bg-white border-t border-black p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-black mb-3">{project.title}</h1>
            <p className="text-black leading-relaxed">{project.description}</p>
            
            {/* Thumbnail Strip */}
            {project.images.length > 1 && (
              <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
                {project.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 relative w-20 h-20 border-2 transition-all ${
                      index === selectedImageIndex
                        ? "border-black"
                        : "border-gray-300 hover:border-gray-500"
                    }`}
                  >
                    <Image
                      src={image.thumbnailUrl || image.url}
                      alt={image.title || `Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

