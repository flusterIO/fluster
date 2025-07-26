import React, { HTMLProps, useMemo } from "react";
import clsx from "clsx";
import { cn } from "../../../utils/cn";

const hintBooleanProp = ["alias", "note", "seeAlso", "hint"] as const;

type HintBooleanProp = (typeof hintBooleanProp)[number];

interface HintProps
  extends HTMLProps<HTMLDivElement>,
    Partial<Record<HintBooleanProp, boolean>> {}

const hintClasses: Record<HintBooleanProp, string> = {
  alias: "text-violet-700 dark:text-violet-600",
  note: "text-sky-600 dark:text-sky-500",
  seeAlso: "text-sky-600 dark:text-sky-500",
  hint: "text-hint",
};

const labelMap: Record<HintBooleanProp, string> = {
  hint: "Hint",
  alias: "Alias",
  note: "Note",
  seeAlso: "See Also",
};

export const Hint = ({ children, ...props }: HintProps) => {
  const selectedType: HintBooleanProp = useMemo(() => {
    for (const h of hintBooleanProp) {
      if (typeof props[h] === "boolean" && props[h]) {
        return h as HintBooleanProp;
      }
    }
    return "hint";
  }, [props]);

  return (
    <div {...props} className={cn("text-sm mb-6", props.className)}>
      <span
        className={clsx("font-bold", hintClasses[selectedType])}
      >{`${labelMap[selectedType]}:`}</span>
      <span className={"text-sm pl-2 [&_*]:inline whitespace-break-spaces"}>
        {children}
      </span>
    </div>
  );
};

Hint.displayName = "Hint";
