import type { NextConfig } from "next";
import { createMDX } from 'fumadocs-mdx/next';

const withMdx = createMDX();

const nextConfig: NextConfig = {
    reactStrictMode: true
};

export default withMdx( nextConfig );
