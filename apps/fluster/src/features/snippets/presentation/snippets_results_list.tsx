import { commands, SnippetItem } from "@/lib/bindings";
import React, { useEffect, useState, type ReactNode } from "react";
import { useSnippetContext } from "../state/snippets_provider";
import SnippetListItem from "./snippet_item/main";

const SnippetsResultsList = (): ReactNode => {
    const state = useSnippetContext();
    const [results, setResults] = useState<SnippetItem[]>([]);
    const getNewSnippetData = async (langs: string[]): Promise<void> => {
        let res = await commands.getSnippets({
            langs,
        });
        if (res.status === "ok") {
            setResults(res.data);
        }
    };
    useEffect(() => {
        getNewSnippetData(
            Object.entries(state.languageFilter)
                .filter((x) => x[1])
                .map((l) => l[0])
        );
    }, [state.languageFilter]);
    return (
        <div className="w-full flex flex-col justify-start items-center gap-6">
            {results.map((l) => (
                <SnippetListItem key={`snippet-${l.label}`} item={l} />
            ))}
        </div>
    );
};

SnippetsResultsList.displayName = "SnippetsResultsList";

export default SnippetsResultsList;
