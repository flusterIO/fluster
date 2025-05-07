"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/actions/render_mdx/render_mdx_to_jsx.ts
var render_mdx_to_jsx_exports = {};
__export(render_mdx_to_jsx_exports, {
  getRemarkPlugins: () => getRemarkPlugins,
  mermaidConfig: () => mermaidConfig,
  parseMdxString: () => parseMdxString
});
module.exports = __toCommonJS(render_mdx_to_jsx_exports);
var import_mdx = require("@mdx-js/mdx");

// src/static/mermaid_theme.ts
var mermaidTheme = {
  light: {
    darkMode: false,
    background: "#fff",
    primaryColor: "#7c3aed",
    primaryTextColor: "#f9fafb",
    secondaryColor: "#2563eb",
    secondaryTextColor: "#111827",
    primaryBorderColor: "#e5e7eb",
    secondaryBorderColor: "#e5e7eb",
    noteBorderColor: "#e5e7eb",
    tertiaryBorderColor: "#e5e7eb",
    tertiaryColor: "#c026d3",
    tertiaryTextColor: "#6b7280",
    lineColor: "#6b7280",
    noteBkgColor: "#f4f4f5",
    noteTextColor: "#000000"
  },
  dark: {
    darkMode: true,
    background: "#000",
    primaryColor: "#6d28d9",
    primaryTextColor: "#f9fafb",
    secondaryColor: "#1d4ed8",
    secondaryTextColor: "#f9fafb",
    primaryBorderColor: "#1f2937",
    tertiaryBorderColor: "#1f2937",
    secondaryBorderColor: "#1f2937",
    tertiaryColor: "#a21caf",
    tertiaryTextColor: "#9ca3af",
    lineColor: "#9ca3af",
    noteBkgColor: "#1b1917",
    noteTextColor: "#000000"
  }
};

// src/actions/render_mdx/render_mdx_to_jsx.ts
var mermaidConfig = {
  output: "svg",
  /* theme: { light: 'dark', dark: 'dark' }, */
  mermaid: {
    themeVariables: mermaidTheme.dark,
    theme: "base"
  }
};
var rehypePlugins = async () => {
  return [
    /* TODO: Add an embeded video component for this rehypeVideo that then utilizes the existing video element. */
    // [
    //     rehypeVideo as any,
    //     {
    //         test: /\/(.*)(.mp4|.mov|.webm)$/,
    //         details: false,
    //     },
    // ],
    // [
    //     rehypeMathjax as any,
    //     {
    //         ...mathOptions,
    //         tex: {
    //             ...mathOptions.tex,
    //             tags: opts?.mathLabels || mathOptions.tex.tags,
    //         },
    //     },
    // ],
    // [
    //     rehypePrettyCode as any,
    //     {
    //         keepBackground: true,
    //         theme: {
    //             light: config?.code?.theme?.light || "material-theme-lighter",
    //             dark: config?.code?.theme?.dark || "dracula",
    //         },
    //         onVisitLine(node: any) {
    //             if (node.children.length === 0) {
    //                 node.children = [{ type: "text", value: " " }];
    //             }
    //         },
    //         onVisitHighlightedLine(node: any) {
    //             node.properties.className.push("line--highlighted");
    //         },
    //         onVisitHighlightedWord(node: any) {
    //             node.properties.className = ["word--highlighted"];
    //         },
    //         transformers: shikiTransformers,
    //         defaultLang: {
    //             block:
    //                 config?.code?.syntaxHighlighting?.defaultLanguage?.block ||
    //                 "python",
    //             inline:
    //                 config?.code?.syntaxHighlighting?.defaultLanguage?.inline || "zsh",
    //         },
    //     },
    // ],
    // [
    //     rehypeAutolinkHeadings,
    //     {
    //         properties: {
    //             className: ["subheading-anchor"],
    //             ariaLabel: "Link to section",
    //         },
    //     },
    // ],
    // rehypeSlug,
    /* [ */
    /*     rehypeImgSize, */
    /*     { dir: "" } */
    /* ], */
  ];
};
var getRemarkPlugins = () => {
  return [
    // remarkMath,
    // remarkHeading,
    // remarkStructure,
    // /* @ts-ignore */
    // remarkGfm as any,
    // emoji as any,
  ];
};
var parseMdxString = async (content) => {
  let _rehypePlugins = await rehypePlugins();
  let res = await (0, import_mdx.compile)(content, {
    outputFormat: "function-body",
    remarkPlugins: getRemarkPlugins(),
    rehypePlugins: _rehypePlugins,
    development: process.env.NODE_ENV === "development"
    /* baseUrl: import.meta.url */
  });
  return String(res).replaceAll(/classname/g, "className");
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getRemarkPlugins,
  mermaidConfig,
  parseMdxString
});
