"use client";
import React, { HTMLProps } from "react";
import type { MDXContent } from "mdx/types";
import { useComponentMap } from "@/hooks/use_component_map";
import { ErrorBoundary } from "react-error-boundary";
import { H2 } from "@fluster.io/dev";

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
                fallback={
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <H2>Oh no</H2>
                        <p className="text-foreground/80 max-w-[540px] text-center">
                            This note can not be parsed successfully. There is likely a syntax
                            error in your note, or perhaps you've included a component from a
                            plugin that you haven't installed?
                        </p>
                    </div>
                }
            >
                <MdxContentComponent components={componentMap} />
            </ErrorBoundary>
        </div>
    );
};
