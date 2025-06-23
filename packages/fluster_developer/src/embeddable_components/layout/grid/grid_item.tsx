import React, { HTMLProps, type ReactNode } from "react";
import { cn } from "../../../utils/cn";

interface GridItemProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

export const GridItem = ({ children, ...props }: GridItemProps): ReactNode => {
  return (
    <div {...props} className={cn("w-full h-full rounded", props.className)}>
      {children}
    </div>
  );
};

GridItem.displayName = "GridItem";
