import React, { useState, type ReactNode } from "react";
import { SnippetSchema } from "../data/snippet_schema";
import { useEventListener } from "@fluster.io/dev";
import SnippetListItem from "./snippet_item/main";

declare global {
  interface WindowEventMap {
    "set-snippet-preview": CustomEvent<{
      data: SnippetSchema;
    }>;
  }
}

const SnippetPreview = (): ReactNode => {
  const [data, setData] = useState<SnippetSchema | null>(null);
  useEventListener("set-snippet-preview", (e) => {
    setData(e.detail.data);
  });
  return (
    <div className="@container/snippet_preview w-full flex flex-col justify-center items-center px-8 py-6">
      {data && (
        <SnippetListItem
          preview
          idx={0}
          item={{
            ...data,
          }}
        />
      )}
    </div>
  );
};

SnippetPreview.displayName = "SnippetPreview";

export default SnippetPreview;
