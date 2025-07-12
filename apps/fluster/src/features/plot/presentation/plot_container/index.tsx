import { InlineMdxContent } from "#/mdx/presentation/inline_mdx_content";
import { usePlotIdIndex } from "#/plot/state/hooks/use_plot_id_index";
import { PlotContainerProps } from "#/plot/types/plot_types";
import { MdxH3 } from "@fluster.io/dev";
import React, { type ReactNode } from "react";

export const PlotContainer = ({
    title,
    children,
    desc,
    id,
}: PlotContainerProps & {
    children: ReactNode;
}): ReactNode => {
    const idx = usePlotIdIndex(id);
    return (
        <div className="w-full max-w-[1080px] bg-card/40 rounded px-2 py-6">
            {title?.length ? (
                <MdxH3 mdx={title} InlineMdxContent={InlineMdxContent} />
            ) : null}
            <div className="w-full flex flex-col justify-center items-center max-h-[80vh] max-w-full overflow-hidden relative">
                {children}
            </div>
            {desc?.length ? (
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="mt-2 px-4 text-sm text-foreground/70 w-full max-w-[768px] text-center">
                        {typeof idx === "number" && idx >= 0 ? (
                            <>
                                <span className="font-semibold text-foreground/90">{`Figure ${idx + 1
                                    }${desc.length ? ": " : ""}`}</span>
                                {desc}
                            </>
                        ) : (
                            desc
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

PlotContainer.displayName = "PlotContainer";
