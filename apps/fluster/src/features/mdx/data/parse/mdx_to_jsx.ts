/* eslint-disable  @typescript-eslint/no-explicit-any -- No need to type library stuff */
import { compile } from "@mdx-js/mdx";
import type { CompileOptions } from "@mdx-js/mdx";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeMathjax from "rehype-mathjax/chtml";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import emoji from "remark-emoji";
import rehypeSlug from "rehype-slug";
import rehypeVideo from "rehype-video";
import rehypeMermaid from "rehype-mermaid";

import {
    mathOptions,
    // mermaidTheme,
} from "./static_mdx_options";
import { ParseMdxStringOptions } from "../types";
import store from "@/state/store";
import { AppState } from "@/state/initial_state";

const rehypePlugins = (): CompileOptions["rehypePlugins"] => {
    const darkMode = document.body.classList.contains("dark");
    // let shikiTransformers = await getShikiTransformers(config)
    const state: AppState = store.getState();
    return [
        /* TODO: Add an embeded video component for this rehypeVideo that then utilizes the existing video element. */
        [
            rehypeVideo as any,
            {
                test: /\/(.*)(.mp4|.mov|.webm)$/,
                details: false,
            },
        ],
        [rehypeMathjax as any, mathOptions],
        [
            rehypeMermaid,
            {
                strategy: "inline-svg",
                dark: darkMode,
                colorScheme: darkMode ? "dark" : "light",
                mermaidConfig: {
                    // output: "svg",
                    /* theme: { light: 'dark', dark: 'dark' }, */
                    mermaid: {
                        background: "hsl(var(--background))",
                        // themeVariables: mermaidTheme.dark,
                        //         theme: "dark",
                    },
                },
            },
        ],
        [
            rehypePrettyCode as any,
            {
                keepBackground: true,
                theme: {
                    light: state.code.theme.light ?? "material-theme-lighter",
                    dark: state.code.theme.dark ?? "dracula",
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
                    block: state.code.defaultLanguage ?? "python",
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
    return [remarkMath, remarkGfm, emoji];
};

export const parseMdxString = async ({ content }: ParseMdxStringOptions) => {
    const res = await compile(content, {
        outputFormat: "function-body",
        remarkPlugins: remarkPlugins(),
        rehypePlugins: rehypePlugins(),
        // development: process.env.NODE_ENV === "development",
        /* baseUrl: import.meta.url */
    });
    return String(res).replaceAll(/classname/g, "className");
};
