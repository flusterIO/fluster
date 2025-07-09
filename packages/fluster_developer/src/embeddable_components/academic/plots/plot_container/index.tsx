import React, { FC, type ReactNode } from "react";
import { PlotContainerProps } from "../types/plot_types";
import { usePlotIdIndex } from "../hooks/use_plot_id_index";

export const PlotContainer = ({
    InlineMdxContent,
    title,
    children,
    desc,
    id,
}: PlotContainerProps & {
    InlineMdxContent: FC<{ mdx: string }>;
    children: ReactNode;
}): ReactNode => {
    const idx = usePlotIdIndex(id);
    console.log("title: ", title);
    return (
        <div className="w-full max-w-[1080px] bg-card/40 rounded px-2 py-6">
            {title?.length ? (
                <h3
                    className={
                        "scroll-m-20 [&_p]:text-2xl [&_p]:font-semibold [&_p]:tracking-tight"
                    }
                >
                    <InlineMdxContent mdx={title} />
                </h3>
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
