import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Tắt ESLint trong quá trình build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
