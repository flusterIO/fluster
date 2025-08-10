import { FC } from "react";

/// Add an InlineMdx prop to pass the mdx component in as a prop through the component map.
export interface WithInlineMdx {
    InlineMdxContent: FC<{
        mdx: string;
        className?: string;
        removeGrayMatter?: boolean;
        abortIfNoMath?: boolean;
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
