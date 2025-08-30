import SnippetListItem from "#/snippets/presentation/snippet_item/main";
import { SnippetData } from "@/lib/bindings";
import React, { type ReactNode } from "react";

interface SnippetSearchResultsProps {
    snippets: SnippetData[];
}

export const SnippetSearchResults = ({
    snippets,
}: SnippetSearchResultsProps): ReactNode => {
    return (
        <div className="w-full h-fit flex flex-col justify-start items-center gap-4">
            {snippets.map((s, i) => {
                return (
                    <SnippetListItem
                        noAnimate
                        hideDeleteButton
                        hideEditButton
                        item={s}
                        idx={i}
                    />
                );
            })}
        </div>
    );
};

SnippetSearchResults.displayName = "SnippetSearchResults";
