"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { photos as staticPhotos } from "@/lib/data";
import { getAllPhotos } from "@/lib/projectUtils";
import PhotoDetailView from "@/components/PhotoDetailView";
import { Photo } from "@/lib/data";

export default function PhotoPageClient({ initialPhoto, initialAllPhotos }: { initialPhoto: Photo | null; initialAllPhotos: Photo[] }) {
  const params = useParams();
  const id = params?.id as string;
  const [photo, setPhoto] = useState<Photo | null>(initialPhoto);
  const [allPhotos, setAllPhotos] = useState<Photo[]>(initialAllPhotos);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadPhoto() {
      // Only reload if photo not found in initial data
      if (!photo || photo.id !== id) {
        setLoading(true);
        try {
          const projectPhotos = await getAllPhotos();
          const combinedPhotos = projectPhotos.length > 0 ? projectPhotos : staticPhotos;
          setAllPhotos(combinedPhotos);
          
          const foundPhoto = combinedPhotos.find((p) => p.id === id);
          setPhoto(foundPhoto || null);
        } catch (error) {
          console.error("Failed to load photo:", error);
          const foundPhoto = staticPhotos.find((p) => p.id === id);
          setPhoto(foundPhoto || null);
          setAllPhotos(staticPhotos);
        } finally {
          setLoading(false);
        }
      }
    }
    loadPhoto();
  }, [id, photo]);

  if (loading) {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-white flex items-center justify-center">
        <p className="text-black">Loading...</p>
      </div>
    );
  }

  if (!photo) {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-white flex items-center justify-center">
        <p className="text-black">Photo not found</p>
      </div>
    );
  }

  return <PhotoDetailView photo={photo} allPhotos={allPhotos} />;
}

