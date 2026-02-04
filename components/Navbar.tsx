"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loadProjects } from "@/lib/projectSource";
import { Project } from "@/lib/projects";

export default function Navbar() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  // Load projects for the Projects dropdown
  useEffect(() => {
    loadProjects().then(setProjects);
  }, []);

  // Keyboard shortcut: Cmd+Shift+A (Mac) or Ctrl+Shift+A (Windows) → Admin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        router.push("/admin");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
    setShowAbout(false);
    setShowProjects(false);
  };

  const handleAboutClick = () => {
    setShowAbout(!showAbout);
    setShowProjects(false);
    if (!isExpanded) setIsExpanded(true);
  };

  const handleProjectsClick = () => {
    setShowProjects(!showProjects);
    setShowAbout(false);
    if (!isExpanded) setIsExpanded(true);
  };

  const closeAll = () => {
    setIsExpanded(false);
    setShowAbout(false);
    setShowProjects(false);
  };

  return (
    <>
      {/* Black tint overlay when About or Projects is expanded */}
      {(showAbout || showProjects) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-500"
          onClick={closeAll}
        />
      )}
      <nav
        className="fixed left-1/2 z-50 transform -translate-x-1/2 w-[calc(100vw-2rem)] max-w-[450px]"
        style={{
          top: "max(1rem, env(safe-area-inset-top))",
        }}
      >
        <div
          className="bg-white overflow-hidden"
          style={{
            width: isExpanded ? "100%" : "auto",
            transition: "width 500ms ease-in-out",
            display: isExpanded ? "block" : "inline-block",
          }}
        >
          {/* Main navbar row - 44px min touch targets */}
          <div className="p-2 flex items-center gap-2">
            <Link
              href="/"
              className="text-black font-medium text-sm hover:underline whitespace-nowrap flex-shrink-0 min-h-[44px] min-w-[44px] p-2 border border-black flex items-center justify-center"
              onClick={closeAll}
            >
              OMVRA STUDIOS
            </Link>
            {!isExpanded && (
              <button
                onClick={toggleMenu}
                className="text-black text-2xl font-light flex items-center justify-center flex-shrink-0 border border-black min-h-[44px] min-w-[44px]"
                aria-label="Toggle menu"
              >
                +
              </button>
            )}
            {isExpanded && (
              <>
                <div className="flex items-center ml-2 gap-2">
                  <button
                    onClick={handleAboutClick}
                    className="min-h-[44px] min-w-[44px] px-3 py-2 text-black text-sm hover:bg-black hover:text-white transition-colors whitespace-nowrap uppercase flex items-center justify-center"
                  >
                    About
                  </button>
                  <button
                    onClick={handleProjectsClick}
                    className="min-h-[44px] min-w-[44px] px-3 py-2 text-black text-sm hover:bg-black hover:text-white transition-colors whitespace-nowrap uppercase flex items-center justify-center"
                  >
                    Projects
                  </button>
                </div>
                <button
                  onClick={toggleMenu}
                  className="text-black text-2xl font-light min-h-[44px] min-w-[44px] p-2 flex items-center justify-center flex-shrink-0 ml-2"
                  aria-label="Toggle menu"
                >
                  ×
                </button>
              </>
            )}
          </div>

          {/* About content - expands downward, scrollable on small screens */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              showAbout ? "max-h-[min(500px,60vh)] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-3 py-4 border-t border-black max-w-full overflow-y-auto max-h-[min(500px,60vh)]" style={{ WebkitOverflowScrolling: "touch" }}>
              <p className="text-black text-sm leading-relaxed mb-3">
                Omar Awadallah is an architectural designer and visual director
                based in Charlotte, North Carolina. He studied architecture at
                UNC Charlotte, where he developed a strong interest in how people
                experience space through design, photography, and film. His work
                focuses on clear, thoughtful storytelling, whether through built
                projects, visual documentation, or creation.
              </p>
              <p className="text-black text-sm leading-relaxed">
                With a multidisciplinary background, he approaches design with
                both creative intent and technical understanding, aiming to make
                complex ideas accessible to a wider audience.
              </p>
            </div>
          </div>

          {/* Projects list - expands downward, scrollable on small screens */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              showProjects ? "max-h-[min(400px,50vh)] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-3 py-4 border-t border-black max-w-full overflow-y-auto max-h-[min(400px,50vh)]" style={{ WebkitOverflowScrolling: "touch" }}>
              {projects.length === 0 ? (
                <p className="text-black text-sm">No projects yet.</p>
              ) : (
                <ul className="space-y-2">
                  {projects.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/project?id=${encodeURIComponent(p.id)}`}
                        onClick={closeAll}
                        className="text-black text-sm hover:underline block"
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
