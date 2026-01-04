/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains: ['localhost', 'api.qrserver.com'],
  },
  async rewrites() {
    return [
      {
        source: '/uploads/projects/:filename',
        destination: '/api/files/projects/:filename',
      },
      {
        source: '/uploads/videos/:filename',
        destination: '/api/files/videos/:filename',
      },
    ];
  },
};

export default nextConfig;
