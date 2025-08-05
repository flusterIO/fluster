import { FC } from "react";

/// Add an InlineMdx prop to pass the mdx component in as a prop through the component map.
export interface WithInlineMdxProp {
    InlineMdxContent: FC<{
        mdx: string;
    }>;
}

export interface PositionableProps {
    center?: boolean;
    sidebar?: boolean;
    right?: boolean;
}

export interface MediaPlayerProps extends PositionableProps {
    file?: string;
    /** The user's note directory. */
    basePath: string;
    id?: string;
    autoPlay?: boolean;
}
