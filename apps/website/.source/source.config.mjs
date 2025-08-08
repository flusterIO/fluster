// fumadocs-mdx.ts
import { defineCollections, defineDocs } from "fumadocs-mdx/config";
import { z } from "zod";
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
var myWork = defineCollections({
  type: "doc",
  dir: "./content/my_work",
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
var documentation = defineDocs({
  dir: "content/docs",
  docs: {
    schema
  },
  meta: {
    schema
  }
});
export {
  docs,
  documentation,
  legal,
  metaFiles,
  myWork
};
