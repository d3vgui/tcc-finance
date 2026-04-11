import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    allowedDevOrigins: [
    "169.254.83.107",
    "localhost:3000"
  ],
};

export default nextConfig;
