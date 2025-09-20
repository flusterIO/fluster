import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX({
    configPath: "./source.config.ts",
});

const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    reactStrictMode: true,
};

export default withMDX(nextConfig);
