import { getComponentMap } from "#/mdx/data/component_map/get_component_map";
import { MDXComponents } from "mdx/types";
import { useMemo } from "react";

export const useComponentMap = (mdxString: string): MDXComponents => {
  return useMemo(() => getComponentMap(mdxString), [mdxString]);
};
