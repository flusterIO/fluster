import React, { HTMLProps } from "react";
import clsx from "clsx";
import { cn } from "../../../utils/cn";

interface HintProps extends HTMLProps<HTMLDivElement> {
  note?: boolean;
  alias?: boolean;
  estimatedTime?: boolean;
}

export const Hint = ({
  children,
  note,
  alias,
  estimatedTime,
  ...props
}: HintProps) => {
  const label = note
    ? "Note"
    : alias
    ? "Alias"
    : estimatedTime
    ? "Estimated Time"
    : "Hint";
  return (
    <div {...props} className={cn("text-sm mb-6", props.className)}>
      <span
        className={clsx(
          "font-bold",
          label === "Hint"
            ? "text-hint"
            : label === "Alias"
            ? "text-violet-400"
            : "text-sky-400"
        )}
      >{`${label}:`}</span>
      <span className={"text-sm pl-2 [&_*]:inline whitespace-break-spaces"}>
        {children}
      </span>
    </div>
  );
};

Hint.displayName = "Hint";
