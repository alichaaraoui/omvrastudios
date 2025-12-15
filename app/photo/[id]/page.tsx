import { notFound } from "next/navigation";
import { photos } from "@/lib/data";
import PhotoDetailView from "@/components/PhotoDetailView";

interface PhotoPageProps {
  params: Promise<{ id: string }>;
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const { id } = await params;
  const photo = photos.find((p) => p.id === id);

  if (!photo) {
    notFound();
  }

  return <PhotoDetailView photo={photo} allPhotos={photos} />;
}

