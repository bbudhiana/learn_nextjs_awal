import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["127.0.0.1", "localhost:3000"],
  images: {
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "images-cdn.openxcell.com",
    //     port: "",
    //     pathname: "/**",
    //   },
    // ],
    //domains: ["source.unsplash.com"],
    unoptimized: true,
  },
};

export default nextConfig;
