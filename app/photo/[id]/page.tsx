import { photos as staticPhotos } from "@/lib/data";
import PhotoPageClient from "./PhotoPageClient";
import { Photo } from "@/lib/data";

interface PhotoPageProps {
  params: Promise<{ id: string }>;
}

// Generate static params for static export (uses static photos)
export async function generateStaticParams() {
  return staticPhotos.map((photo) => ({
    id: photo.id,
  }));
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const { id } = await params;
  const photo = staticPhotos.find((p) => p.id === id) || null;

  return <PhotoPageClient initialPhoto={photo} initialAllPhotos={staticPhotos} />;
}

