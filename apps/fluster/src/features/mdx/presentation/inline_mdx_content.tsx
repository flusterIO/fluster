import React, { type ReactNode } from "react";
import { MdxContentProps, MdxContent } from "./mdx_content";
import { cn } from "@fluster.io/dev";

export const InlineMdxContent = (
    props: MdxContentProps & {
        abortIfNoMath?: boolean;
    }
): ReactNode => {
    if (!props.mdx) {
        return null;
    }
    if (
        props.abortIfNoMath &&
        typeof props.mdx === "string" &&
        !props.mdx?.includes("$")
    ) {
        return props.mdx;
    }
    return (
        <MdxContent
            {...props}
            className={cn("[&_p]:mb-0 [&_p]:mt-0 [&>p]:inline", props.className)}
        />
    );
};

InlineMdxContent.displayName = "InlineMdxContent";
