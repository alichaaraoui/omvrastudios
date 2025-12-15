"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Photo } from "@/lib/data";

interface PhotoCardProps {
  photo: Photo;
}

export default function PhotoCard({ photo }: PhotoCardProps) {
  const router = useRouter();

  return (
    <div
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
  );
}

