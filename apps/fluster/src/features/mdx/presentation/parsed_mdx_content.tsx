"use client";
import React from "react";
import type { MDXContent } from "mdx/types";
import { useComponentMap } from "@/hooks/use_component_map";

export const ParsedMdxContent = ({
  MdxContentComponent,
  raw,
  className,
}: {
  MdxContentComponent: MDXContent;
  raw: string;
  className?: string;
}) => {
  const componentMap = useComponentMap(raw);
  return (
    <div className={className}>
      <MdxContentComponent components={componentMap} />
    </div>
  );
};
