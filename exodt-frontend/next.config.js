/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cloudflare-ipfs.com', 's3.us-east-005.backblazeb2.com'],
  },
}

module.exports = nextConfig