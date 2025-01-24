/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["thebarss.com"], // Allow serving images from your domain
    unoptimized: true, // Optional: Disable static image optimization
  },
  trailingSlash: true, // Optional for static hosting compatibility
  reactStrictMode: false,

  // Add rewrites for sitemap and robots.txt
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap", // Dynamic sitemap route
      },
      {
        source: "/robots.txt",
        destination: "/api/robots", // Dynamic robots.txt route
      },
    ];
  },
};

module.exports = nextConfig;
