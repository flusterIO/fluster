import React, { type ReactNode } from "react";
import { BibliographyTable } from "./bib_table/index";
import PanelContainer from "@/components/util/panel_container";
import { BibTableProvider } from "../state/bib_table_provider";
import BibTableTitleBar from "./bib_table/top_title_bar";
import { BibTableFilterRow } from "./bib_table/bib_table_filter_row";

const BibliographyPage = (): ReactNode => {
    return (
        <PanelContainer
            id="scroll-target-bib"
            className="h-full min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center overflow-y-auto"
        >
            <BibTableProvider>
                <div className="w-full px-8 py-8 flex flex-col justify-start items-center max-w-[1440px]">
                    <BibTableTitleBar />
                    <BibTableFilterRow />
                    <BibliographyTable />
                </div>
            </BibTableProvider>
        </PanelContainer>
    );
};

BibliographyPage.displayName = "BibliographyPage";

export default BibliographyPage;
