import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '4mb' // Increase the limit to 4MB or your desired size
    }
  }
};

export default nextConfig;
