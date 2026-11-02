import type { NextConfig } from "next";
import { withEve } from "eve/next";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: false },
};

export default withEve(nextConfig);
