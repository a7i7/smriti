import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // GitHub Pages does not support Next.js Image Optimization
  },
};

export default nextConfig;
