import React, { type ReactNode } from "react";
import { BibliographyTable } from "./bib_table/index";
import PanelContainer from "@/components/util/panel_container";
import { BibTableProvider } from "../state/bib_table_provider";
import { BibTableButtomButtons } from "./bib_table/bottom_buttons";
import BibTableTitleBar from "./bib_table/top_title_bar";
import { BibTableFilterRow } from "./bib_table/bib_table_filter_row";

const BibliographyPage = (): ReactNode => {
  return (
    <PanelContainer>
      <BibTableProvider>
        <div className="w-full px-8 mt-8 flex flex-col justify-start items-center max-w-[1080px]">
          <BibTableTitleBar />
          <BibTableFilterRow />
          <BibliographyTable />
          <BibTableButtomButtons />
        </div>
      </BibTableProvider>
    </PanelContainer>
  );
};

BibliographyPage.displayName = "BibliographyPage";

export default BibliographyPage;
