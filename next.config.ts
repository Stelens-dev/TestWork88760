import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost", "192.168.1.111"],
  images: {
    domains: ["cdn.dummyjson.com"],
  },
};

export default nextConfig;
