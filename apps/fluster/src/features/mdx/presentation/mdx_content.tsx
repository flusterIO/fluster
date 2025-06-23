import React, { useEffect, type ReactNode } from "react";
import { useDebounceMdxParse } from "../state/hooks/use_debounce_mdx_parse";
import { cn } from "@/lib/utils";
import { commands } from "@/lib/bindings";

export interface MdxContentProps {
  mdx: string;
  className?: string;
  removeGrayMatter?: boolean;
}

export const MdxContent = ({
  mdx,
  className,
  removeGrayMatter,
}: MdxContentProps): ReactNode => {
  const { Component, setValue } = useDebounceMdxParse();

  const setParsedValue = async (initialBody: string): Promise<void> => {
    const res = await commands.removeFrontMatter(initialBody);
    setValue(res);
  };
  useEffect(() => {
    if (removeGrayMatter) {
      setParsedValue(mdx);
    } else {
      setValue(mdx);
    }
    /* eslint-disable-next-line  --  */
  }, [mdx]);
  return (
    <Component
      className={cn(
        "prose dark:prose-invert prose-p:text-foreground prose-code:before:content-none prose-code:after:content-none prose-code:bg-[--shiki-light-bg] dark:prose-code:bg-[--shiki-dark-bg] [&_code_*]:text-[--shiki-light] dark:[&_code_*]:text-[--shiki-dark] w-full  max-w-full @container/mdx prose-code:p-2 prose-pre:bg-transparent dark:prose-pre:bg-transparent",
        className
      )}
    />
  );
};

MdxContent.displayName = "MdxContent";
