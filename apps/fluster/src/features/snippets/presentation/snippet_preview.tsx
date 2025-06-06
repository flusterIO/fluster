import React, { useState, type ReactNode } from "react";
import { SnippetSchema } from "../data/snippet_schema";
import { useEventListener } from "@fluster.io/dev";
import { SnippetModal } from "@fluster.io/dev";
import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";
import { useDarkMode } from "@/hooks/use_dark_mode";

declare global {
  interface WindowEventMap {
    "set-snippet-preview": CustomEvent<{
      data: SnippetSchema;
    }>;
  }
}

const connector = connect((state: AppState) => ({
  themes: state.code.theme,
  props: {},
}));

const SnippetPreview = connector(
  ({ themes }: { themes: AppState["code"]["theme"] }): ReactNode => {
    const [data, setData] = useState<SnippetSchema | null>(null);
    useEventListener("set-snippet-preview", (e) => {
      setData(e.detail.data);
    });
    const isDark = useDarkMode();
    return (
      <div className="@container/snippet_preview w-full flex flex-col justify-center items-center px-8 py-6">
        {data && <SnippetModal darkMode={isDark} themes={themes} data={data} />}
      </div>
    );
  }
);

SnippetPreview.displayName = "SnippetPreview";

export default SnippetPreview;
