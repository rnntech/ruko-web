import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The share-picture route reads these fonts at run time (app/share/[id]/route.tsx, D-049).
  outputFileTracingIncludes: { "/share/[id]": ["./assets/fonts/**"] },
  // D-112: the APKs live in Supabase Storage, so an update needs no redeploy; the site's link stays the same.
  async redirects() {
    const lite = process.env.RUKO_LITE_URL;
    return lite ? [{ source: "/download/ruko-lite.apk", destination: lite, permanent: false }] : [];
  },
};

export default nextConfig;
