import { compile } from "@mdx-js/mdx";
import type { CompileOptions } from "@mdx-js/mdx";
// import {
//     remarkHeading,
//     remarkStructure,
//     remarkGfm
// } from "fumadocs-core/mdx-plugins";
/* import rehypeImgSize from "rehype-img-size"; */
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeMathjax from "rehype-mathjax/chtml";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import emoji from "remark-emoji";
/* import toc from "@jsdevtools/rehype-toc" */
import rehypeSlug from "rehype-slug";
import rehypeVideo from "rehype-video";
import {
    mathOptions,
    MermaidConfigType,
    mermaidTheme,
} from "./static_mdx_options";
import { ParseMdxStringOptions } from "../types";
// import { highlightTransformerMap } from "../utils/highlightTransformerMap";

export const mermaidConfig: MermaidConfigType = {
    output: "svg",
    /* theme: { light: 'dark', dark: 'dark' }, */
    mermaid: {
        themeVariables: mermaidTheme.dark,
        theme: "base",
    },
};

const rehypePlugins = async (): Promise<CompileOptions["rehypePlugins"]> => {
    // let shikiTransformers = await getShikiTransformers(config)
    return [
        /* TODO: Add an embeded video component for this rehypeVideo that then utilizes the existing video element. */
        [
            rehypeVideo as any,
            {
                test: /\/(.*)(.mp4|.mov|.webm)$/,
                details: false,
            },
        ],
        [
            rehypeMathjax as any,
            {
                ...mathOptions,
                tex: {
                    ...mathOptions.tex,
                    tags: mathOptions.tex.tags,
                },
            },
        ],
        [
            rehypePrettyCode as any,
            {
                keepBackground: true,
                theme: {
                    light: "material-theme-lighter",
                    dark: "dracula",
                },
                onVisitLine(node: any) {
                    if (node.children.length === 0) {
                        node.children = [{ type: "text", value: " " }];
                    }
                },
                onVisitHighlightedLine(node: any) {
                    node.properties.className.push("line--highlighted");
                },
                onVisitHighlightedWord(node: any) {
                    node.properties.className = ["word--highlighted"];
                },
                // transformers: shikiTransformers,
                defaultLang: {
                    block: "python",
                    inline: "zsh",
                },
            },
        ],
        [
            rehypeAutolinkHeadings,
            {
                properties: {
                    className: ["subheading-anchor"],
                    ariaLabel: "Link to section",
                },
            },
        ],
        rehypeSlug,
        /* [ */
        /*     rehypeImgSize, */
        /*     { dir: "" } */
        /* ], */
    ];
};

const remarkPlugins = (): /* config?: AppConfigSchemaOutput, */
    CompileOptions["remarkPlugins"] => {
    return [
        remarkMath,
        // remarkHeading,
        // remarkStructure,
        /* @ts-ignore */
        remarkGfm,
        emoji as any,
    ];
};

export const parseMdxString = async ({ content }: ParseMdxStringOptions) => {
    let _rehypePlugins = await rehypePlugins();
    let res = await compile(content, {
        outputFormat: "function-body",
        remarkPlugins: remarkPlugins(),
        rehypePlugins: _rehypePlugins,
        // development: process.env.NODE_ENV === "development",
        /* baseUrl: import.meta.url */
    });
    return String(res).replaceAll(/classname/g, "className");
};
