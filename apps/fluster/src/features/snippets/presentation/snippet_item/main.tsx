import { SnippetItem } from "@/lib/bindings";
import React, { type ReactNode } from "react";

interface SnippetItemComponentProps {
    item: SnippetItem;
}

const SnippetListItem = ({ item }: SnippetItemComponentProps): ReactNode => {
    return <div>{item.body}</div>;
};

SnippetListItem.displayName = "SnippetListItem";

export default SnippetListItem;
