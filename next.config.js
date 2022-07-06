/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['gateway.pinata.cloud'],
    unoptimized: true,
  },
 
}

module.exports = nextConfig
