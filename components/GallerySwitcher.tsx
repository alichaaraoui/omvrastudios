"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Photo } from "@/lib/data";

// Dynamically import 3D components with SSR disabled for static export
const SphereGallery = dynamic(() => import("./SphereGallery"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-white flex items-center justify-center">
      <p className="text-black">Loading gallery...</p>
    </div>
  ),
});

const RowGallery = dynamic(() => import("./RowGallery"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-white flex items-center justify-center">
      <p className="text-black">Loading gallery...</p>
    </div>
  ),
});

const GridGallery = dynamic(() => import("./GridGallery"), {
  ssr: false,
});

interface GallerySwitcherProps {
  photos: Photo[];
}

type ViewMode = "sphere" | "row" | "grid";

export default function GallerySwitcher({ photos }: GallerySwitcherProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("sphere");

  return (
    <div className="w-full relative">
      {viewMode === "sphere" ? (
        <>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex gap-2">
            <button
              onClick={() => setViewMode("sphere")}
              className="p-3 border border-black bg-black text-white"
              aria-label="Sphere view"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <ellipse cx="10" cy="10" rx="8" ry="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </button>
            <button
              onClick={() => setViewMode("row")}
              className="p-3 border border-black bg-white text-black hover:bg-black hover:text-white transition-colors"
              aria-label="Row view"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="6" width="16" height="2" fill="currentColor"/>
                <rect x="2" y="10" width="16" height="2" fill="currentColor"/>
                <rect x="2" y="14" width="16" height="2" fill="currentColor"/>
              </svg>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className="p-3 border border-black bg-white text-black hover:bg-black hover:text-white transition-colors"
              aria-label="Grid view"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="7" height="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <rect x="11" y="2" width="7" height="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <rect x="2" y="11" width="7" height="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <rect x="11" y="11" width="7" height="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </button>
          </div>
          <SphereGallery photos={photos} />
        </>
      ) : (
        <>
          {viewMode === "row" && <RowGallery photos={photos} />}
          {viewMode === "grid" && (
            <div className="w-full max-w-6xl mx-auto px-4">
              <GridGallery photos={photos} />
            </div>
          )}
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex gap-2">
            <button
              onClick={() => setViewMode("sphere")}
              className="p-3 border border-black bg-white text-black hover:bg-black hover:text-white transition-colors"
              aria-label="Sphere view"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <ellipse cx="10" cy="10" rx="8" ry="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </button>
            <button
              onClick={() => setViewMode("row")}
              className={`p-3 border border-black ${
                viewMode === "row"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-black hover:text-white transition-colors"
              }`}
              aria-label="Row view"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="6" width="16" height="2" fill="currentColor"/>
                <rect x="2" y="10" width="16" height="2" fill="currentColor"/>
                <rect x="2" y="14" width="16" height="2" fill="currentColor"/>
              </svg>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-3 border border-black ${
                viewMode === "grid"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-black hover:text-white transition-colors"
              }`}
              aria-label="Grid view"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="7" height="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <rect x="11" y="2" width="7" height="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <rect x="2" y="11" width="7" height="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <rect x="11" y="11" width="7" height="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

