"use client";
import React, { HTMLProps } from "react";
import type { MDXContent } from "mdx/types";
import { useComponentMap } from "@/hooks/use_component_map";

interface Props extends HTMLProps<HTMLDivElement> {
  MdxContentComponent: MDXContent;
  raw: string;
  className?: string;
}

/* TODO: Add error boundary component here to gracefully fail when mdx has a typo. */
export const ParsedMdxContent = ({
  MdxContentComponent,
  raw,
  ...props
}: Props) => {
  const componentMap = useComponentMap(raw);
  return (
    <div {...props}>
      <MdxContentComponent components={componentMap} />
    </div>
  );
};
