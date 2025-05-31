import React, { HTMLProps, type ReactNode } from "react";
import { H4 } from "./typography/typography";
import { cn } from "@/lib/utils";

interface SidePanelContainerProps extends HTMLProps<HTMLDivElement> {
  label: string;
}

const SidePanelContainer = ({
  children,
  label,
  className,
  ...props
}: SidePanelContainerProps): ReactNode => {
  return (
    <div
      {...props}
      className={cn(
        "px-6 py-4 flex flex-col justify-center items-center gap-6",
        className
      )}
    >
      <H4 className="w-full">{label}</H4>
      <div className="overflow-y-auto w-full max-w-full flex flex-col justify-center items-center gap-6 px-[0.2rem]">
        {children}
      </div>
    </div>
  );
};

SidePanelContainer.displayName = "SidePanelContainer";

export default SidePanelContainer;
