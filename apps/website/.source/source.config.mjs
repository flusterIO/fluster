// source.config.ts
import {
  defineCollections,
  defineConfig,
  defineDocs
} from "fumadocs-mdx/config";
import { z } from "zod";
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax/chtml";
var config = {
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
            processEnvironments: true
          },
          chtml: {
            fontURL: "https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2",
            adaptiveCSS: true
          }
        }
      ],
      ...v
    ]
  }
};
var schema = z.object({
  title: z.string().optional(),
  pages: z.array(z.string()).optional(),
  defaultOpen: z.boolean().optional(),
  root: z.boolean().optional()
});
var docs = defineCollections({
  type: "doc",
  dir: "./content/docs",
  schema
  // mdxOptions: getDefaultMDXOptions(),
  // other options
});
var metaFiles = defineCollections({
  dir: "./content/",
  type: "meta"
  // options
});
var legal = defineCollections({
  type: "doc",
  dir: "./content/legal",
  schema
  // mdxOptions: getDefaultMDXOptions(),
  // other options
});
var myWork = defineDocs({
  dir: "content/my_work",
  docs: {
    // mdxOptions: config.mdxOptions,
  }
});
var documentation = defineDocs({
  dir: "content/docs"
  // docs: {
  //     schema,
  // },
  // meta: {
  //     schema,
  // },
});
var source_config_default = defineConfig(config);
export {
  source_config_default as default,
  docs,
  documentation,
  legal,
  metaFiles,
  myWork
};
