import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: '/sklad',
        statusCode: 301
      }
    ]
  },
};

export default nextConfig;
