/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // For GitHub Pages, if your repo name is not the root, set basePath
  // basePath: '/omvrastudios',
  // assetPrefix: '/omvrastudios',
};

export default nextConfig;

