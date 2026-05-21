/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dxenbzden/**',
      },
      {
        protocol: 'https',
        hostname: 'player.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
