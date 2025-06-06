import { commands, SnippetModel } from "@/lib/bindings";
import React, { useEffect, useState, type ReactNode } from "react";
import SnippetListItem from "./snippet_item/main";
import NoSnippetsFound from "./no_snippets_found";
import { useEventListener } from "@/hooks/use_event_listener";
import { showToast } from "#/toast_notification/data/events/show_toast";
import { LoadingComponent } from "@/components/loading_screen";
import { useSnippetContext } from "../state/snippet_context";
import { useSearchParams } from "react-router";
import SnippetPreview from "./snippet_preview";

const mapToStringList = (data: Record<string, boolean>): string[] => {
  const items = [];
  for (const x in data) {
    if (data[x]) {
      items.push(x);
    }
  }
  return items;
};

const SnippetsResultsList = (): ReactNode => {
  const context = useSnippetContext();
  const [searchParams] = useSearchParams();

  const editingId = searchParams.get("editing");
  const [results, setResults] = useState<SnippetModel[] | "loading">("loading");
  const getNewSnippetData = async (langs: string[]): Promise<void> => {
    const res = await commands.getSnippets({
      langs,
    });
    if (res.status === "ok") {
      setResults(res.data);
    } else {
      console.error(
        `An error occurred while attempting to gather snippets from the database: `,
        res.error
      );
      setResults([]);
    }
  };
  const gatherData = (langs?: Record<string, boolean>): void => {
    getNewSnippetData(mapToStringList(langs ?? context.languageFilter)).catch(
      () => {
        showToast({
          title: "Oh no",
          body: "Something went wrong while gathering your snippets.",
          duration: 5000,
          variant: "Error",
        });
      }
    );
  };

  useEffect(() => {
    gatherData();
    /* eslint-disable-next-line  --  */
  }, [context.languageFilter]);

  useEventListener("reload-snippet-list", (e) => gatherData(e.detail?.langs));

  if (editingId?.length) {
    return <SnippetPreview />;
  }

  return (
    <div className="w-full flex flex-col justify-start items-center gap-6">
      {results === "loading" ? (
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-80px)]">
          <div>
            <LoadingComponent />
          </div>
        </div>
      ) : results.length ? (
        results.map((l, i) => (
          <SnippetListItem
            idx={i}
            key={`snippet-${l.label}`}
            item={{
              ...l,
              tags: [],
            }}
          />
        ))
      ) : (
        <NoSnippetsFound />
      )}
    </div>
  );
};

SnippetsResultsList.displayName = "SnippetsResultsList";

export default SnippetsResultsList;
