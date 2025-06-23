import { useBibTableContext } from "#/bibliography/state/bib_table_context";
import { H2 } from "@/components/typography/typography";
import React, { type ReactNode } from "react";

const BibTableTitleBar = (): ReactNode => {
  const { count, predicate } = useBibTableContext();
  return (
    <div className="w-full mb-8">
      <H2>Bibliography</H2>
      <p className="text-muted-foreground mt-2">{`Found ${count} items ${
        predicate ? "matching your query" : "in your bibliography"
      }`}</p>
    </div>
  );
};

BibTableTitleBar.displayName = "BibTableTitleBar";

export default BibTableTitleBar;
