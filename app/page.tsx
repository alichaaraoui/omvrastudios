import { photos } from "@/lib/data";
import GallerySwitcher from "@/components/GallerySwitcher";

export default function Home() {
  return (
    <>
      <GallerySwitcher photos={photos} />
    </>
  );
}

