import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";

const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    reactStrictMode: true,
};

export default withContentCollections(nextConfig);
