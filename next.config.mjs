/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/omvrastudios',
  assetPrefix: '/omvrastudios',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Exclude API routes and admin page from static export
  async generateBuildId() {
    return 'static-build';
  },
  // Skip API routes - they don't work with static export
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

export default nextConfig;

