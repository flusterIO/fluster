import { commands, SnippetItem } from "@/lib/bindings";
import { useEffect, useState, type ReactNode } from "react";
import { useSnippetContext } from "../state/snippets_provider";
import SnippetListItem from "./snippet_item/main";
import NoSnippetsFound from "./no_snippets_found";
import { useEventListener } from "@/hooks/use_event_listener";
import { showToast } from "#/toast_notification/data/events/show_toast";

const SnippetsResultsList = (): ReactNode => {
    const { languageFilter } = useSnippetContext();
    const [results, setResults] = useState<SnippetItem[] | "loading">("loading");
    const getNewSnippetData = async (langs: string[]): Promise<void> => {
        const res = await commands.getSnippets({
            langs,
        });
        if (res.status === "ok") {
            setResults(res.data);
        } else {
            setResults([]);
        }
    };
    const gatherData = (): void => {
        getNewSnippetData(
            Object.entries(languageFilter)
                .filter((x) => x[1])
                .map((l) => l[0])
        ).catch(() => {
            showToast({
                title: "Oh no",
                body: "Something went wrong while gathering your snippets.",
                duration: 5000,
                variant: "Error",
            });
        });
    };

    useEffect(() => {
        gatherData();
    }, [languageFilter]);

    useEventListener("reload-snippet-list", () => gatherData());

    return (
        <div className="w-full flex flex-col justify-start items-center gap-6">
            {results === "loading" ? (
                <div className="flex flex-col justify-center items-center min-h-[calc(100vh-80px)]">
                    <div>Loading...</div>
                </div>
            ) : results.length ? (
                results.map((l, i) => (
                    <SnippetListItem idx={i} key={`snippet-${l.label}`} item={l} />
                ))
            ) : (
                <NoSnippetsFound />
            )}
        </div>
    );
};

SnippetsResultsList.displayName = "SnippetsResultsList";

export default SnippetsResultsList;
