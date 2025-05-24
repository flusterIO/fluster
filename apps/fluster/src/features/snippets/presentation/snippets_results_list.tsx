import { commands, SnippetItem } from "@/lib/bindings";
import { useEffect, useState, type ReactNode } from "react";
import { useSnippetContext } from "../state/snippets_provider";
import SnippetListItem from "./snippet_item/main";
import NoSnippetsFound from "./no_snippets_found";

const SnippetsResultsList = (): ReactNode => {
    const { languageFilter } = useSnippetContext();
    const [results, setResults] = useState<SnippetItem[]>([]);
    const getNewSnippetData = async (langs: string[]): Promise<void> => {
        console.log("langs: ", langs);
        let res = await commands.getSnippets({
            langs,
        });
        if (res.status === "ok") {
            setResults(res.data);
        }
    };
    useEffect(() => {
        let newLangs = Object.entries(languageFilter)
            .filter((x) => x[1])
            .map((l) => l[0]);
        console.log("newLangs: ", newLangs);
        getNewSnippetData(newLangs);
    }, [languageFilter]);

    return (
        <div className="w-full flex flex-col justify-start items-center gap-6">
            {results.length ? (
                results.map((l) => (
                    <SnippetListItem key={`snippet-${l.label}`} item={l} />
                ))
            ) : (
                <NoSnippetsFound />
            )}
        </div>
    );
};

SnippetsResultsList.displayName = "SnippetsResultsList";

export default SnippetsResultsList;
