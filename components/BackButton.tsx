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
      className="text-black border border-black p-2 flex items-center justify-center min-h-[44px] min-w-[44px]"
      aria-label="Back"
    >
      ←
    </button>
  );
}

