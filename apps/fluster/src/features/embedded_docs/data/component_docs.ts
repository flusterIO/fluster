export interface ComponentDocsEntry {
    label: string;
    /// The file path relative to docs/embbedded.
    fp: string;
}

export const componentDocItems: ComponentDocsEntry[] = [
    {
        label: "Abstract",
        fp: "component_docs/academic/abstract.mdx",
    },
    {
        label: "Admonition",
        fp: "component_docs/admonition.mdx",
    },
    {
        label: "Card",
        fp: "component_docs/card.mdx",
    },
    {
        label: "Grid & Grid Item",
        fp: "component_docs/grid.mdx",
    },
    {
        label: "Highlight",
        fp: "component_docs/highlight.mdx",
    },
    {
        label: "Hint",
        fp: "component_docs/hint.mdx",
    },
    {
        label: "Underline",
        fp: "component_docs/underline.mdx",
    },
];
