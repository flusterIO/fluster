/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
    entryPoints: ["./src/index.ts"],
    out: "../../docs/generated/html/typedoc",
    outputs: [
        {
            name: "html",
            path: "../../docs/generated/html/typedoc/",
            options: {
                navigation: {
                    includeCategories: true,
                    includeGroups: true,
                    excludeReferences: false,
                    includeFolders: true
                }
            }
        },
        {
            name: "markdown",
            path: "../../docs/generated/mdx/typedoc/",
        },
        {
            name: "markdown",
            path: "../../docs/generated/json/typedoc/",
        },
    ],
    plugin: ["typedoc-material-theme"],
    themeColor: "#0ba5e9",
};
