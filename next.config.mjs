// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**', // Path pattern for TMDB images
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com', // Allow placeholder images
        pathname: '/**', // Allow all paths
      },
    ],
  },
};

export default nextConfig;
