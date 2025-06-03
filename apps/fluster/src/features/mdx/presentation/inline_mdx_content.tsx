import React, { type ReactNode } from "react";
import { MdxContentProps, MdxContent } from "./mdx_content";
import { cn } from "@fluster.io/dev";

export const InlineMdxContent = (props: MdxContentProps): ReactNode => {
    return (
        <MdxContent {...props} className={cn("[&_p]:mb-0", props.className)} />
    );
};

InlineMdxContent.displayName = "InlineMdxContent";
