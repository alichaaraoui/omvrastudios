/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/omvrastudios",
  assetPrefix: "/omvrastudios",
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

