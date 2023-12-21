/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["https://image.tmdb.org/"],
    // formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**",
      },
    ],
  },
};

module.exports = nextConfig;
