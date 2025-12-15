"use client";

import { useState, useMemo } from "react";
import { photos } from "@/lib/data";
import GridGallery from "@/components/GridGallery";

export default function GalleryPage() {
  const [selectedSeries, setSelectedSeries] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const series = useMemo(() => {
    const uniqueSeries = new Set(photos.map((p) => p.series));
    return Array.from(uniqueSeries);
  }, []);

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) => {
      const matchesSeries = selectedSeries === "all" || photo.series === selectedSeries;
      const matchesSearch =
        searchQuery === "" ||
        photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSeries && matchesSearch;
    });
  }, [selectedSeries, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-16">
      <h1 className="text-4xl font-medium mb-8 text-black">Gallery</h1>

      {/* Filters */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by title or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-black bg-white text-black placeholder-black placeholder-opacity-50 focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>
        <div>
          <select
            value={selectedSeries}
            onChange={(e) => setSelectedSeries(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border border-black bg-white text-black focus:outline-none focus:ring-1 focus:ring-black"
          >
            <option value="all">All Series</option>
            {series.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Gallery Grid */}
      <GridGallery photos={filteredPhotos} />
    </div>
  );
}

