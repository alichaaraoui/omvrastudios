/** @type {import('next').NextConfig} */
// For custom domain (root URL): set USE_ROOT_URL=true in GitHub Actions variables. Otherwise uses /omvrastudios.
const useRoot = process.env.USE_ROOT_URL === "true";
const basePath = useRoot ? "" : "/omvrastudios";
const nextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_GITHUB_REPO: process.env.NEXT_PUBLIC_GITHUB_REPO || "alichaaraoui/omvrastudios",
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  pageExtensions: ["tsx", "ts", "jsx", "js"],
};

export default nextConfig;

