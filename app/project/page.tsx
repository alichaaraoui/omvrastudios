import { Suspense } from "react";
import ProjectPageClient from "./ProjectPageClient";

export default function ProjectPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><p className="text-black">Loading…</p></div>}>
      <ProjectPageClient />
    </Suspense>
  );
}
