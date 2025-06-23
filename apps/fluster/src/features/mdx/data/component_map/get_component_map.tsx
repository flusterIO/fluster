/* eslint-disable  @typescript-eslint/no-explicit-any  --  */
import React, { FC } from "react";
import {
    Tag,
    Admonition,
    Ul,
    Hint,
    Hl,
    QrCode,
    BlockQuote,
    ColorSwatch,
    EmbeddableCard,
    type QrCodeProps,
    ColorPalette,
    InlineCitation,
    Small,
    Grid,
    GridItem,
    MdxInput,
} from "@fluster.io/dev";
import { MDXComponents } from "mdx/types";
import {
    Blockquote,
    H1,
    H2,
    H3,
    H4,
    P,
} from "@/components/typography/typography";
import { InlineMdxContent } from "#/mdx/presentation/inline_mdx_content";
import { commands } from "@/lib/bindings";

interface ComponentMapItem {
    /// A regex that will return true if this component is to be included in the component map. This will be prepended with a `<`, so the name should match the component as it will be used in the user's note.
    query: string;
    component: FC<any>;
    requiresInlineMdx?: boolean;
}

export const componentOverrides: MDXComponents = {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    p: P,
    blockquote: BlockQuote,
    mark: Hl,
    /* hr: Hr, */
    /* a: A, */
    input: MdxInput,
    /* img: ImgComponent as any, */
};

const items: ComponentMapItem[] = [
    {
        query: "Tag",
        component: Tag,
    },
    // -- Layout --
    {
        query: "Admonition",
        component: Admonition,
        requiresInlineMdx: true,
    },
    {
        query: "Card",
        component: EmbeddableCard,
        requiresInlineMdx: true,
    },
    {
        query: "Grid",
        component: Grid,
    },

    {
        query: "GridItem",
        component: GridItem,
    },
    // -- Text --
    {
        query: "Small",
        component: Small,
    },
    // -- Attention Getters --
    {
        query: "Hint",
        component: Hint,
    },
    {
        query: "Ul",
        component: Ul,
    },
    {
        query: "Hl",
        component: Hl,
    },
    {
        query: "Quote",
        component: Blockquote,
    },
    // -- Less Commonly Used Components --
    {
        query: "Qr",
        component: (props: QrCodeProps) => (
            <QrCode {...props} getQrCodeSvg={commands.getQrCodeSvg} />
        ),
    },
    {
        query: "Color",
        component: ColorSwatch,
    },
    {
        query: "ColorPalette",
        component: ColorPalette,
    },
    // -- Auto Inserted --
    {
        query: "InlineCitation",
        component: InlineCitation,
    },
];

export const getComponentMap = (mdxContent: string): MDXComponents => {
    const components: MDXComponents = componentOverrides;
    for (const item of items) {
        if (mdxContent.includes(`<${item.query}`)) {
            const C = item.component;
            components[item.query] = item.requiresInlineMdx
                ? (props: object) => (
                    <C {...props} InlineMdxContent={InlineMdxContent} />
                )
                : item.component;
        }
    }
    return components;
};
