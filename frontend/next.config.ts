import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    return config;
  },
  images: {
    domains: ['example.com', 'localhost', '127.0.0.1', '192.168.77.7'],
  },
};

export default nextConfig;
