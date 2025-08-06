import { defineCollection, defineConfig } from "@content-collections/core";
import type { z as _zod } from "zod";
import { transformMdx } from "./src/core/mdx/transform_mdx";

const utilFields = (z: typeof _zod) => {
    return {
        icon: z.string().optional(),
        blogPin: z.number().optional(),
        description: z.string().optional(),
        created: z
            .union([z.string(), z.date(), z.undefined(), z.null()])
            .optional(),
        updated: z
            .union([z.string(), z.date(), z.undefined(), z.null()])
            .optional(),
        images: z.string().array().optional(),
        priority: z.number().default(5),
        featuredEquation: z.string().optional(),
        blog: z.boolean().default(false),
        sequential: z.number().optional(),
        sequentialId: z.string().optional(),
        title: z.string(),
        full: z.boolean().optional(),
        id: z.string().optional(),
        titleCenter: z.boolean().default(false),
        noTitle: z.boolean().default(false),
        hideDescription: z.boolean().default(false),
        category: z.string().optional(),
        parseCitations: z.boolean().default(false),
    };
};

const metas = defineCollection({
    name: "meta",
    directory: "../../docs/website",
    include: "*/**/meta.json",
    parser: "json",
    schema: (z) => {
        return {
            title: z.string().optional(),
            pages: z.array(z.string()).optional(),
            defaultOpen: z.boolean().optional(),
            root: z.boolean().optional(),
        };
    },
});

const myWork = defineCollection({
    name: "myWork",
    directory: "../../docs/my_work",
    include: "**/*.mdx",
    schema: (z) => {
        return {
            title: z.string(),
            description: z.string().optional(),
            icon: z.string().optional(),
            full: z.boolean().optional(),
        };
    },
    transform: transformMdx,
});

const docs = defineCollection({
    name: "docs",
    directory: "../../docs/website",
    include: "**/*.mdx",
    schema: (z) => {
        return {
            title: z.string(),
            description: z.string().optional(),
            icon: z.string().optional(),
            full: z.boolean().optional(),
        };
    },
    transform: transformMdx,
});

const blog = defineCollection({
    name: "blog",
    directory: "../../docs/",
    include: "blog/**/*.mdx",
    schema: (z) => utilFields(z),
    transform: transformMdx,
});

const legal = defineCollection({
    name: "legal",
    directory: "../../docs/website",
    include: "legal/**/*.mdx",
    schema: (z) => {
        return {
            title: z.string().optional(),
            pages: z.array(z.string()).optional(),
            defaultOpen: z.boolean().optional(),
            root: z.boolean().optional(),
            id: z.string().optional(),
        };
    },
    transform: transformMdx,
});

export default defineConfig({
    collections: [docs, metas, blog, legal, myWork],
});
