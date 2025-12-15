"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className="text-black border border-black p-2 flex items-center justify-center"
      style={{ width: '2.5rem', height: '2.5rem' }}
      aria-label="Back to sphere"
    >
      ←
    </button>
  );
}

