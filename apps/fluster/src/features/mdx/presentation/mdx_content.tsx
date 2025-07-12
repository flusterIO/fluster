import React, { HTMLProps, useEffect, type ReactNode } from "react";
import { useDebounceMdxParse } from "../state/hooks/use_debounce_mdx_parse";
import { cn } from "@/lib/utils";
import { commands } from "@/lib/bindings";

export interface MdxContentProps extends HTMLProps<HTMLDivElement> {
    mdx: string;
    className?: string;
    removeGrayMatter?: boolean;
    abortIfNoMath?: boolean;
}

export const MdxContent = ({
    mdx,
    className,
    removeGrayMatter,
    abortIfNoMath,
    ...props
}: MdxContentProps): ReactNode => {
    const { Component, setValue } = useDebounceMdxParse();

    const setParsedValue = async (initialBody: string): Promise<void> => {
        try {
            const res = await commands.parseMdxString(initialBody, null);
            console.log("res: ", res);
            if (res.status === "ok") {
                setValue(res.data.mdx.raw_body);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (removeGrayMatter) {
            setParsedValue(mdx);
        } else {
            setValue(mdx);
        }
        /* eslint-disable-next-line  --  */
    }, [mdx]);

    if (abortIfNoMath && !mdx.includes("$")) {
        return mdx;
    }

    return (
        <Component
            {...props}
            className={cn(
                "mdx-content prose dark:prose-invert prose-p:text-foreground prose-code:before:content-none prose-code:after:content-none prose-code:bg-[--shiki-light-bg] dark:prose-code:bg-[--shiki-dark-bg] [&_code_*]:text-[--shiki-light] dark:[&_code_*]:text-[--shiki-dark] w-full  max-w-full @container/mdx prose-code:p-2 prose-pre:bg-transparent dark:prose-pre:bg-transparent",
                className
            )}
        />
    );
};

MdxContent.displayName = "MdxContent";
