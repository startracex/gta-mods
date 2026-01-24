import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";
const nextConfig: NextConfig = {
  output: "export",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
};

export default withContentCollections(nextConfig);
