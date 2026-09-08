import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["112.172.81.229", "localhost", "127.0.0.1"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
