"use client";
import React, { HTMLProps } from "react";
import type { MDXContent } from "mdx/types";
import { useComponentMap } from "@/hooks/use_component_map";
import { ErrorBoundary } from "react-error-boundary";

interface Props extends HTMLProps<HTMLDivElement> {
    MdxContentComponent: MDXContent;
    raw: string;
    className?: string;
}

export const ParsedMdxContent = ({
    MdxContentComponent,
    raw,
    ...props
}: Props) => {
    const componentMap = useComponentMap(raw);
    return (
        <div {...props}>
            <ErrorBoundary
                onError={(e) => {
                    console.error("Mdx Error: ", e);
                }}
                fallback={null}
            >
                <MdxContentComponent components={componentMap} />
            </ErrorBoundary>
        </div>
    );
};
