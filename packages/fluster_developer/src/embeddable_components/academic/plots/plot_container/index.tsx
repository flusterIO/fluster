import React, { FC, type ReactNode } from "react";
import { PlotContainerProps } from "../types/plot_types";

export const PlotContainer = ({
    InlineMdxContent,
    title,
    children,
    desc,
}: PlotContainerProps & {
    InlineMdxContent: FC<{ mdx: string }>;
    children: ReactNode;
}): ReactNode => {
    return (
        <div className="w-full max-w-[1080px] bg-card/40 rounded px-2 py-6">
            {title?.length ? (
                <h3 className="text-xl font-bold">
                    <InlineMdxContent mdx={title} />
                </h3>
            ) : null}
            <div className="w-full flex flex-col justify-center items-center max-h-[80vh] max-w-full">
                {children}
            </div>
            {desc?.length ? (
                <div className="mt-2 px-4 text-sm text-foreground/70 w-full text-center">
                    {desc}
                </div>
            ) : null}
        </div>
    );
};

PlotContainer.displayName = "PlotContainer";
