import { FC } from "react";

/// Add an InlineMdx prop to pass the mdx component in as a prop through the component map.
export interface WithInlineMdxProp {
    InlineMdxContent: FC<{
        mdx: string;
    }>;
}
