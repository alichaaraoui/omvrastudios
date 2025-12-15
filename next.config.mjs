/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Remove basePath if using custom domain or username.github.io
  // Add basePath: '/omvrastudios' if using username.github.io/omvrastudios
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;

