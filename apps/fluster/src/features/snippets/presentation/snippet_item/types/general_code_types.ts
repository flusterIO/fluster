import { SnippetModel } from "@/lib/bindings";

export interface SnippetItem extends SnippetModel {
    tags: string[];
}
