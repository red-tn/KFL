/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kingsfamilylakes.com',
      },
    ],
  },
}

export default nextConfig
