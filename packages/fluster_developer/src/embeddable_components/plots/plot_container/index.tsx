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
    <div className="w-full max-w-[1080px]">
      {title?.length ? (
        <h3 className="text-xl font-bold">
          <InlineMdxContent mdx={title} />
        </h3>
      ) : null}
      <div className="w-full flex flex-col justify-center items-center max-h-[80vh] max-w-full">
        {children}
      </div>
      {desc?.length ? <div>{desc}</div> : null}
    </div>
  );
};

PlotContainer.displayName = "PlotContainer";
