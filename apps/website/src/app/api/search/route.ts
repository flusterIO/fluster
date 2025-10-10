import { source } from "../../../core/mdx/sources/fumadocs_mdx/docs";
import { createFromSource } from "fumadocs-core/search/server";

export const { GET } = createFromSource(source, {
    language: "english",
});
