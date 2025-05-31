import React, { useEffect, type ReactNode } from "react";
import { useDebounceMdxParse } from "../state/hooks/use_debounce_mdx_parse";
import { cn } from "@/lib/utils";

interface MdxContentProps {
  mdx: string;
  className?: string;
}

const MdxContent = ({ mdx, className }: MdxContentProps): ReactNode => {
  const { Component, setValue } = useDebounceMdxParse();
  useEffect(() => {
    setValue(mdx);
    /* eslint-disable-next-line  --  */
  }, [mdx]);
  return (
    <Component
      className={cn(
        "prose dark:prose-invert prose-p:text-foreground w-full max-w-full",
        className
      )}
    />
  );
};

MdxContent.displayName = "MdxContent";

export default MdxContent;
