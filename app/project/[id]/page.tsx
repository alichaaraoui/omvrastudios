import ProjectPageClient from "./ProjectPageClient";

// Generate static params for static export
// Return a dummy param - the page will handle actual project loading client-side
export async function generateStaticParams() {
  // Return at least one param for static export compatibility
  // The actual project will be loaded client-side based on the URL
  return [{ id: "dummy" }];
}

export default function ProjectPage() {
  // Just render the client component - it will load the project dynamically
  return <ProjectPageClient />;
}

