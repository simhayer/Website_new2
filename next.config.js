/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["thebarss.com"], // Allow serving images from your domain
    unoptimized: true, // Optional: Disable static image optimization
  },
  output: "export",
  trailingSlash: true, // Optional for static hosting compatibility
  reactStrictMode: false,
};

module.exports = nextConfig;
