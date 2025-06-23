// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";

// src/core/mdx/transform_mdx.ts
import {
  rehypeCode,
  rehypeCodeDefaultOptions,
  remarkGfm,
  remarkHeading,
  remarkStructure
} from "fumadocs-core/mdx-plugins";
import { transformerTwoslash } from "fumadocs-twoslash";
import {
  transformerMetaHighlight,
  transformerNotationWordHighlight
} from "@shikijs/transformers";
import { compileMDX as baseCompileMDX } from "@content-collections/mdx";
import remarkEmoji from "remark-emoji";
import remarkMath from "remark-math";
import {
  remarkDocGen,
  remarkInstall,
  fileGenerator
} from "fumadocs-docgen";
import rehypeMathJaxCHtml from "rehype-mathjax/chtml";
var transformMdx = (document, context) => {
  return context.cache(
    {
      type: "fumadocs",
      document
    },
    async () => {
      let data = {};
      const body = await baseCompileMDX(
        {
          ...context,
          cache: async (input, fn) => fn(input)
        },
        document,
        {
          cwd: process.cwd(),
          remarkPlugins: [
            remarkMath,
            remarkGfm,
            remarkHeading,
            remarkInstall,
            [
              remarkDocGen,
              {
                generators: [
                  fileGenerator()
                  // typescriptGenerator()
                ]
              }
            ],
            remarkStructure,
            remarkEmoji,
            () => {
              return (_, file) => {
                data = file.data;
              };
            }
          ],
          rehypePlugins: [
            [
              rehypeMathJaxCHtml,
              {
                tex: {
                  tags: "all",
                  useLabelIds: true,
                  processEscapes: true,
                  processEnvironments: true
                },
                chtml: {
                  fontURL: "/font/mathjax",
                  adaptiveCSS: true
                }
              }
            ],
            [
              rehypeCode,
              {
                defaultLanguage: "tsx",
                transformers: [
                  ...rehypeCodeDefaultOptions.transformers,
                  transformerTwoslash(),
                  transformerNotationWordHighlight(),
                  transformerMetaHighlight()
                ],
                themes: {
                  light: "github-light",
                  dark: "aurora-x"
                }
              }
            ]
            // [rehypeImgSize, { dir: "./public" }],
          ]
        }
      );
      return {
        ...document,
        ...data,
        body
      };
    }
  );
};

// content-collections.ts
var utilFields = (z) => {
  return {
    icon: z.string().optional(),
    blogPin: z.number().optional(),
    description: z.string().optional(),
    created: z.union([z.string(), z.date(), z.undefined(), z.null()]).optional(),
    updated: z.union([z.string(), z.date(), z.undefined(), z.null()]).optional(),
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
    parseCitations: z.boolean().default(false)
  };
};
var metas = defineCollection({
  name: "meta",
  directory: "../../docs/website",
  include: "*/**/meta.json",
  parser: "json",
  schema: (z) => {
    return {
      title: z.string().optional(),
      pages: z.array(z.string()).optional(),
      defaultOpen: z.boolean().optional(),
      root: z.boolean().optional()
    };
  }
});
var docs = defineCollection({
  name: "docs",
  directory: "../../docs/website",
  include: "**/*.mdx",
  schema: (z) => {
    return {
      title: z.string(),
      description: z.string().optional(),
      icon: z.string().optional(),
      full: z.boolean().optional()
    };
  },
  transform: transformMdx
});
var blog = defineCollection({
  name: "blog",
  directory: "../../docs/",
  include: "blog/**/*.mdx",
  schema: (z) => utilFields(z),
  transform: transformMdx
});
var legal = defineCollection({
  name: "legal",
  directory: "../../docs/website",
  include: "legal/**/*.mdx",
  schema: (z) => {
    return {
      title: z.string().optional(),
      pages: z.array(z.string()).optional(),
      defaultOpen: z.boolean().optional(),
      root: z.boolean().optional(),
      id: z.string().optional()
    };
  },
  transform: transformMdx
});
var content_collections_default = defineConfig({
  collections: [docs, metas, blog, legal]
});
export {
  content_collections_default as default
};
