import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { ReactNode } from "react";
import { Hint } from "../components/hint";
import { Admonition } from "#/features/docs/embedded_components/admonition";
/* import { Mermaid } from "#/features/docs/embedded_components/mermaid"; */
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
    /* eslint-disable-next-line  -- Don't include table with default components */
    const { table: _table, ...selectedFumaComponents } = defaultMdxComponents;
    return {
        ...selectedFumaComponents,
        ...components,
        pre: (props) => {
            /* eslint-disable-next-line  --  */
            const { ref: _, ...filteredProps } = props;
            return (
                <CodeBlock keepBackground {...filteredProps}>
                    <Pre>{props.children}</Pre>
                </CodeBlock>
            );
        },
        /* Mermaid: Mermaid, */
        blockquote: (props: { children: ReactNode }) => {
            return (
                <div
                    className={
                        "pl-4 border-l-4 !border-l-primary [&_p]:before:content-none [&_p]:after:content-none"
                    }
                >
                    {props.children}
                </div>
            );
        },
        Hint,
        Admonition,
    };
}
