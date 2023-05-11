/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'photos.ubiflow.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
