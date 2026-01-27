"use client";

import { useState, useEffect } from "react";
import { photos as staticPhotos } from "@/lib/data";
import { getAllPhotos } from "@/lib/projectUtils";
import GallerySwitcher from "@/components/GallerySwitcher";
import { Photo } from "@/lib/data";

export default function Home() {
  const [photos, setPhotos] = useState<Photo[]>(staticPhotos);
  const [loading, setLoading] = useState(true);

  const loadPhotos = async () => {
    try {
      const projectPhotos = await getAllPhotos();
      // Combine static photos with project photos, or use only project photos if they exist
      if (projectPhotos.length > 0) {
        setPhotos(projectPhotos);
      } else {
        setPhotos(staticPhotos);
      }
    } catch (error) {
      console.error("Failed to load photos:", error);
      setPhotos(staticPhotos);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPhotos();

    // Listen for storage changes (when projects are added/updated in admin)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "omvra_projects") {
        loadPhotos();
      }
    };

    // Listen for custom event (for same-tab updates)
    const handleCustomStorageChange = () => {
      loadPhotos();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("projectsUpdated", handleCustomStorageChange);

    // Poll for changes every 2 seconds (fallback for same-tab updates)
    const interval = setInterval(() => {
      loadPhotos();
    }, 2000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("projectsUpdated", handleCustomStorageChange);
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen bg-white flex items-center justify-center">
        <p className="text-black">Loading gallery...</p>
      </div>
    );
  }

  return (
    <>
      <GallerySwitcher photos={photos} />
    </>
  );
}

