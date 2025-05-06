import { compile } from "@mdx-js/mdx";
import type { CompileOptions } from "@mdx-js/mdx";
// import {
//     MermaidConfigType,
//     mermaidTheme,
// } from "@ulld/utilities/defaults/defaultMermaidConfig";
// import { mathOptions } from "@ulld/utilities/defaults/markdownUniversalOptions";
import {
    remarkHeading,
    remarkStructure,
    remarkGfm,
} from "fumadocs-core/mdx-plugins";
import { mermaidTheme } from "../../static/mermaid_theme.js";
/* import rehypeImgSize from "rehype-img-size"; */
// import remarkMath from "remark-math";
// import rehypeMathjax from "rehype-mathjax/chtml";
// import rehypeAutolinkHeadings from "rehype-autolink-headings";
// import rehypePrettyCode from 'rehype-pretty-code';
// import emoji from 'remark-emoji';
/* import toc from "@jsdevtools/rehype-toc" */
// import rehypeSlug from 'rehype-slug';
// import rehypeVideo from 'rehype-video';

// import { highlightTransformerMap } from "../utils/highlightTransformerMap";
// import { ParseMdxStringOptions, ParseMdxStringParams } from "./types";
//

const mathOptions = {
    tex: {
        // packages: [],
        tags: "all", // "all" | "ams" (ams breaks EqRef component, unless can find other way to force label creation.),
        useLabelIds: true,
        processEscapes: true,
        processEnvironments: true,
    },
    chtml: {
        fontURL: "/font/mathjax",
        adaptiveCSS: true,
    },
};

export const mermaidConfig = {
    output: "svg",
    /* theme: { light: 'dark', dark: 'dark' }, */
    mermaid: {
        themeVariables: mermaidTheme.dark,
        theme: "base",
    },
};

const getShikiTransformers = async () => {
    let x: any[] = [];
    // let transformerData = config?.code?.syntaxHighlighting?.transformers;
    // if (!transformerData) {
    //     let wordHighlight = await import('@shikijs/transformers').then(
    //         (x) => x.transformerMetaWordHighlight,
    //     );
    //     let lineHighlight = await import('@shikijs/transformers').then(
    //         (x) => x.transformerMetaHighlight,
    //     );
    //     return [wordHighlight, lineHighlight];
    // }
    // for (const k in transformerData) {
    //     if (transformerData[k as keyof typeof transformerData]) {
    //         let transformerItem = await import('@shikijs/transformers').then(
    //             (x) =>
    //                 x[highlightTransformerMap[k as keyof typeof highlightTransformerMap]],
    //         );
    //         x.push(transformerItem);
    //     }
    // }
    return x;
};

const rehypePlugins = async (): Promise<CompileOptions["rehypePlugins"]> => {
    // let shikiTransformers = await getShikiTransformers(config);
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

export const getRemarkPlugins = (): CompileOptions["remarkPlugins"] => {
    return [
        // remarkMath,
        // remarkHeading,
        // remarkStructure,
        // /* @ts-ignore */
        // remarkGfm as any,
        // emoji as any,
    ];
};

// RESUME: Come back here tomorrow when on power and decent wifi.
// Pass the remark and rehype plugins in as parameters to avoid generating them multiple times when parsing multiple files. Create 2 wrapper functions, 1 that parses a single file and 1 that accepts an array of paths.
export const parseMdxString = async ({
    content,
    opts = {},
}: ParseMdxStringParams) => {
    let _rehypePlugins = await rehypePlugins(appConfig, opts);
    let res = await compile(content, {
        outputFormat: "function-body",
        remarkPlugins: remarkPlugins(),
        rehypePlugins: _rehypePlugins,
        development: process.env.NODE_ENV === "development",
        /* baseUrl: import.meta.url */
    });
    return String(res).replaceAll(/classname/g, "className");
};

export type { ParseMdxStringOptions, ParseMdxStringParams };
