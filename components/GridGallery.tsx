"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Photo } from "@/lib/data";

interface GridGalleryProps {
  photos: Photo[];
}

export default function GridGallery({ photos }: GridGalleryProps) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {photos.map((photo) => (
        <div
          key={photo.id}
          onClick={() => router.push(`/photo/${photo.id}`)}
          className="border border-black cursor-pointer hover:opacity-80 transition-opacity bg-white"
        >
          <div className="relative w-full aspect-square">
            <Image
              src={photo.thumbnailUrl}
              alt={`Photo: ${photo.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium text-black mb-1">{photo.title}</h3>
            <p className="text-sm text-black">
              {photo.location}, {photo.year}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

