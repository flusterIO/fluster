import { commands, SnippetItem } from "@/lib/bindings";
import { useEffect, useState, type ReactNode } from "react";
import { useSnippetContext } from "../state/snippets_provider";
import SnippetListItem from "./snippet_item/main";
import NoSnippetsFound from "./no_snippets_found";
import { useEventListener } from "@/hooks/use_event_listener";
import { array } from "zod";

const SnippetsResultsList = (): ReactNode => {
    const { languageFilter } = useSnippetContext();
    const [results, setResults] = useState<SnippetItem[] | "loading">("loading");
    const getNewSnippetData = async (langs: string[]): Promise<void> => {
        let res = await commands.getSnippets({
            langs,
        });
        if (res.status === "ok") {
            setResults(res.data);
        }
    };
    const gatherData = (): void => {
        let newLangs = Object.entries(languageFilter)
            .filter((x) => x[1])
            .map((l) => l[0]);
        console.log("newLangs: ", newLangs);
        getNewSnippetData(newLangs);
    };
    useEffect(() => {
        gatherData();
    }, [languageFilter]);

    useEventListener("reload-snippet-list", (e) => gatherData());

    return (
        <div className="w-full flex flex-col justify-start items-center gap-6">
            {results === "loading" ? (
                <div className="flex flex-col justify-center items-center min-h-[calc(100vh-80px)]">
                    <div>Loading...</div>
                </div>
            ) : results.length ? (
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
