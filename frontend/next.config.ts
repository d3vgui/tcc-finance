import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /* config options here */
  //   allowedDevOrigins: [
  //   "169.254.83.107",
  //   "localhost:3000"
  // ],


async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://tcc-finance.onrender.com/api/:path*', 
      },
    ]
  },
};



export default nextConfig;
