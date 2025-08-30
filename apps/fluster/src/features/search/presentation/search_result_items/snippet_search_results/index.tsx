import { SnippetData } from "@/lib/bindings";
import React, { type ReactNode } from "react";

interface SnippetSearchResultsProps {
    snippets: SnippetData[];
}

export const SnippetSearchResults = ({
    snippets,
}: SnippetSearchResultsProps): ReactNode => {
    return <div>Snippets</div>;
};

SnippetSearchResults.displayName = "SnippetSearchResults";
