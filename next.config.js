/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/test-frontend-blossom",
  assetPrefix: "/test-frontend-blossom/",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
        pathname: "/api/character/avatar/**",
      },
    ],
  },
}

module.exports = nextConfig
