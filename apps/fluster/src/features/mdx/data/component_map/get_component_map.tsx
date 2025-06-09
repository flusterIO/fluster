/* eslint-disable  @typescript-eslint/no-explicit-any  --  */
import React, { FC } from "react";
import {
    Tag,
    Admonition,
    Ul,
    Hint,
    Hl,
    QrCode,
    type QrCodeProps,
} from "@fluster.io/dev";
import { MDXComponents } from "mdx/types";
import {
    H1,
    H2,
    H3,
    H4,
    P,
    Blockquote,
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
    blockquote: Blockquote,
    mark: Hl,
    /* hr: Hr, */
    /* a: A, */
    /* ol: Ol, */
    /* ul: Ul, */
    /* li: Li, */
    /* input: MdxInput, */
    /* table: TableWrapper, */
    /* img: ImgComponent as any, */
};

const items: ComponentMapItem[] = [
    {
        query: "Tag",
        component: Tag,
    },
    {
        query: "Admonition",
        component: Admonition,
        requiresInlineMdx: true,
    },
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
        query: "Qr",
        component: (props: QrCodeProps) => (
            <QrCode {...props} getQrCodeSvg={commands.getQrCodeSvg} />
        ),
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
