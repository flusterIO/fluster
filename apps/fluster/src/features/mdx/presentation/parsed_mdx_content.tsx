"use client";
import React, { useRef } from "react";
import type { MDXComponents, MDXContent } from "mdx/types";
import { getComponentMap } from "#/mdx/data/component_map/get_component_map";

export const ParsedMdxContent = ({
    MdxContentComponent,
    raw,
    className,
}: {
    MdxContentComponent: MDXContent;
    raw: string;
    className?: string;
}) => {
    const ref = useRef<HTMLDivElement>(null!);
    /* useMathjaxBandaid(ref); */
    return (
        <div ref={ref} className={className}>
            <MdxContentComponent components={getComponentMap(raw) as MDXComponents} />
        </div>
    );
};
