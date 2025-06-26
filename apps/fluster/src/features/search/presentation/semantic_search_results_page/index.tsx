import { commands, SemanticSearchResults } from "@/lib/bindings";
import React, { useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router";

export const SemanticSearchResultsPage = (): ReactNode => {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState<SemanticSearchResults | null>(null);
    const query = searchParams.get("query");
    const getData = async (query: string): Promise<void> => {
        const res = await commands.semanticSearch(query);
        if (res.status === "ok") {
            setData(res.data);
        } else {
            console.error("An error occured while gathering your data.", res.error);
        }
    };
    useEffect(() => {
        if (query) {
            getData(query);
        } else {
            setData({
                notes: [],
            });
        }
    }, [query]);
    return <div>{`Semantic Search Results ${data?.notes.length}`}</div>;
};

SemanticSearchResultsPage.displayName = "SemanticSearchResultsPage";
