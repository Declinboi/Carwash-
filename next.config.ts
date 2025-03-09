import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    domains: [
      "tailwindui.com",
      "m.media-amazon.com",
      "images.pexels.com",
      "res.cloudinary.com",
      "randomuser.me",
      "www.cartrollers.com",
      "drive.google.com",
      "localhost",
    ],
  },

  async rewrites() {
    return [
      {
        source: "/:path*",  // Redirects all API calls
        destination: "https://api.platonicwash.com/:path*", // API server
      },
    ];
  },
};

export default nextConfig;
