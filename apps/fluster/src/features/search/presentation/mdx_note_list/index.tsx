import { showToast } from "#/toast_notification/data/events/show_toast";
import { LoadingComponent } from "@/components/loading_screen";
import { commands, MdxNoteGroup } from "@/lib/bindings";
import React, { useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router";

export const MdxNoteSearchResultsList = (): ReactNode => {
  const [items, setItems] = useState<MdxNoteGroup[] | null>(null);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const gatherData = async (_query: string): Promise<void> => {
    const res = await commands.mdxNoteFullTextSearch(_query, {
      page_number: 1,
      per_page: 20,
    });
    if (res.status === "ok") {
      setItems(res.data);
    } else {
      setItems([]);
      console.error(`An error occurred while gathering mdx notes: `, res.error);
      showToast({
        title: "Oh no",
        body: "An error occurred while gathering your notes.",
        variant: "Error",
        duration: 5000,
      });
    }
  };
  useEffect(() => {
    if (query) {
      gatherData(query);
    } else {
      setItems([]);
    }
  }, [query]);

  if (items === null) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <LoadingComponent />
      </div>
    );
  }
  return <div>Mdx Note List</div>;
};

MdxNoteSearchResultsList.displayName = "MdxNoteList";
