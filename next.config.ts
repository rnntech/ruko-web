import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The share-picture route reads these fonts at run time (app/share/[id]/route.tsx, D-049).
  outputFileTracingIncludes: { "/share/[id]": ["./assets/fonts/**"] },
};

export default nextConfig;
