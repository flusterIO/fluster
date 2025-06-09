import React, { useEffect, type ReactNode } from "react";
import { useDebounceMdxParse } from "../state/hooks/use_debounce_mdx_parse";
import { cn } from "@/lib/utils";

export interface MdxContentProps {
    mdx: string;
    className?: string;
}

export const MdxContent = ({ mdx, className }: MdxContentProps): ReactNode => {
    const { Component, setValue } = useDebounceMdxParse();
    useEffect(() => {
        setValue(mdx);
        /* eslint-disable-next-line  --  */
    }, [mdx]);
    return (
        <Component
            className={cn(
                "prose dark:prose-invert prose-p:text-foreground prose-code:before:content-none prose-code:after:content-none prose-code:bg-[--shiki-light-bg] dark:prose-code:bg-[--shiki-dark-bg] [&_code_*]:text-[--shiki-light] dark:[&_code_*]:text-[--shiki-dark] w-full  max-w-full @container/mdx",
                className
            )}
        />
    );
};

MdxContent.displayName = "MdxContent";
