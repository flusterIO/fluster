import SidePanelContainer from "@/components/side_panel_container";
import React, { useMemo, type ReactNode } from "react";
import LanguageFilterItem from "./language_item";
import { bundledLanguages } from "@fluster.io/dev";

const SnippetsFilterPanel = (): ReactNode => {
  const languages = useMemo(() => ["All", ...bundledLanguages], []);
  return (
    <SidePanelContainer label="Filter Snippets">
      <div className="flex flex-col justify-start items-center gap-2 w-full max-w-[600px]">
        {languages.map((k) => (
          <LanguageFilterItem lang={k} key={`cmd-item-${k}`} />
        ))}
      </div>
    </SidePanelContainer>
  );
};

SnippetsFilterPanel.displayName = "SnippetsFilterPanel";

export default SnippetsFilterPanel;
