/* eslint-disable  @typescript-eslint/no-explicit-any  --  */
import { FC } from "react";
import { Tag } from "@fluster.io/dev";

interface ComponentMapItem {
    /// A regex that will return true if this component is to be included in the component map.
    query: string;
    component: FC<any>;
}

const items: ComponentMapItem[] = [
    {
        query: "Tag",
        component: Tag,
    },
];

export const getComponentMap = (
    mdxContent: string
): Record<string, FC<any>> => {
    const components: Record<string, FC<any>> = {};
    for (const item of items) {
        if (mdxContent.includes(item.query)) {
            components[item.query] = item.component;
        }
    }
    return components;
};
