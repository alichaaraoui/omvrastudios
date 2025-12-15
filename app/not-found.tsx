import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-4 text-center py-16 pt-24">
      <h1 className="text-4xl font-medium mb-4 text-black">404</h1>
      <p className="text-black mb-8">Page not found.</p>
      <Link
        href="/"
        className="inline-block border border-black px-6 py-3 text-black hover:bg-black hover:text-white transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}

