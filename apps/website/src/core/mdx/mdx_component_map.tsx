import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { ReactNode } from "react";
import { Hint } from "../components/hint";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
    return {
        ...defaultMdxComponents,
        ...components,
        blockquote: (props: { children: ReactNode }) => {
            return (
                <div
                    className={
                        "pl-4 border-l-4 border-l-primary [&_p]:before:content-none [&_p]:after:content-none"
                    }
                >
                    {props.children}
                </div>
            );
        },
        Hint: Hint,
    };
}
