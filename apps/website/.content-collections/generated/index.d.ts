import configuration from "../../content-collections.ts";
import { GetTypeByName } from "@content-collections/core";

export type Doc = GetTypeByName<typeof configuration, "docs">;
export declare const allDocs: Array<Doc>;

export type Meta = GetTypeByName<typeof configuration, "meta">;
export declare const allMetas: Array<Meta>;

export type Blog = GetTypeByName<typeof configuration, "blog">;
export declare const allBlogs: Array<Blog>;

export type Legal = GetTypeByName<typeof configuration, "legal">;
export declare const allLegals: Array<Legal>;

export {};
