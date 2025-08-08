import { defineCollections, defineDocs } from "fumadocs-mdx/config";
import { z } from "zod";

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
