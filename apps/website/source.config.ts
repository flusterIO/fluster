import {
    defineCollections,
    defineConfig,
    defineDocs,
    GlobalConfig,
} from "fumadocs-mdx/config";
import { z } from "zod";
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax/chtml";

const config: GlobalConfig = {
    mdxOptions: {
        remarkPlugins: [remarkMath],
        rehypePlugins: (v) => [
            [
                rehypeMathjax,
                {
                    tex: {
                        tags: "all",
                        useLabelIds: true,
                        processEscapes: true,
                        processEnvironments: true,
                    },
                    chtml: {
                        fontURL:
                            "https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2",
                        adaptiveCSS: true,
                    },
                },
            ],
            ...v,
        ],
    },
};

const schema = z.object({
    title: z.string().optional(),
    pages: z.array(z.string()).optional(),
    defaultOpen: z.boolean().optional(),
    root: z.boolean().optional(),
});

export const docs = defineCollections({
    type: "doc",
    dir: "./content/docs",
    schema,
    // mdxOptions: getDefaultMDXOptions(),
    // other options
});

// export const myWorkCo = defineCollections({
//     type: "doc",
//     dir: "./content/my_work",
//     schema,
//     // mdxOptions: getDefaultMDXOptions(),
//     // other options
// });

export const metaFiles = defineCollections({
    dir: "./content/",
    type: "meta",
    // options
});

export const legal = defineCollections({
    type: "doc",
    dir: "./content/legal",
    schema,
    // mdxOptions: getDefaultMDXOptions(),
    // other options
});

export const myWork = defineDocs({
    dir: "content/my_work",
    docs: {
        // mdxOptions: config.mdxOptions,
    },
});

export const documentation = defineDocs({
    dir: "content/docs",
    // docs: {
    //     schema,
    // },
    // meta: {
    //     schema,
    // },
});

export default defineConfig(config);
