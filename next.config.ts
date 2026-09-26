import type { NextConfig } from "next";

// Static export so Render can serve the `out` folder as a static site.
const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
